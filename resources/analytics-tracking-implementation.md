# PartsBase — Analytics Tracking Implementation Guide

**Status:** 🔴 GA4 broken — SPA routing not handled  
**Scope:** Fix foundation → implement full event taxonomy → wire ad platforms → validate  
**Owner:** Dan Rodgers  
**Last updated:** 2026-05-26  
**Source:** `resources/partsbase-tracking-config.json`

---

## Bottom Line First

GA4 is recording zero meaningful data because `page_view` never fires on SPA route changes. Every report is wrong. Before wiring any event, campaign, or attribution model — **the SPA fix must ship first**. Everything else in this document is blocked until that's done.

**Day 7 fix target.** After that, implementation can proceed in parallel with the rest of the 30/60/90 build.

---

## Dependency Map

```
① Fix SPA page_view (GTM History Change trigger)         ← Day 7
        ↓
② Configure GA4 Custom Dimensions + Base Tag             ← Day 7–10
        ↓
③ Implement conversion events (rfq, demo, membership)    ← Day 10–14
        ↓
④ Implement engagement events (search, supplier, part)   ← Day 14–21
        ↓
⑤ CookiePro → GA4 Advanced Consent Mode                  ← Day 14–21
        ↓
⑥ Google Ads + LinkedIn Ads conversion tracking          ← Day 21–28
        ↓
⑦ Meta Pixel + CAPI (Vector retargeting)                 ← Day 28–35
        ↓
⑧ HubSpot ↔ GA4 integration + AOG alert automation      ← Day 28–35
        ↓
⑨ Validation pass + data quality audit                   ← Day 35
```

---

## ① Fix the SPA — GTM History Change Trigger

**Root cause:** partsbase.com is a client-side SPA. When a user navigates between pages, the URL changes but the browser does not reload — so GTM's default Page View trigger never fires. GA4 records the landing page and nothing else.

**Fix:** Add a History Change trigger in GTM that fires `page_view` on every virtual route change.

### Step-by-step

**In GTM:**

1. **Create new Trigger**
   - Type: `History Change`
   - Name: `Trigger — History Change (SPA Route)`
   - Fire on: All History Changes

2. **Create new Tag**
   - Type: `Google Analytics: GA4 Event`
   - Name: `GA4 — Page View (SPA)`
   - Measurement ID: `{{Constant — GA4 Measurement ID}}`
   - Event Name: `page_view`
   - Parameters:
     ```
     page_location  →  {{Page URL}}
     page_title     →  {{Page Title}}
     page_path      →  {{Page Path}}
     ```
   - Trigger: `Trigger — History Change (SPA Route)`

3. **Disable duplicate** — if Enhanced Measurement has "Page Views" enabled AND you have a separate GTM page view tag, you'll get doubles. Keep Enhanced Measurement's page view ON only for the initial load; the History Change tag covers subsequent routes.

### Validate in GTM Preview

1. Open GTM Preview, enter `partsbase.com`
2. Navigate between pages using the site nav (not browser back/forward)
3. Each navigation should fire the `Trigger — History Change (SPA Route)` tag
4. In GA4 DebugView (`Admin → DebugView`), confirm `page_view` fires with correct `page_location` and `page_title` values per route

### UTM persistence across routes

UTMs get stripped when the SPA re-renders the URL. Fix this:

```javascript
// Add to your app's router initialization or root component
// Persist UTM params to sessionStorage on first load
(function persistUTMs() {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  const stored = {};
  utmKeys.forEach(k => {
    const val = params.get(k);
    if (val) {
      sessionStorage.setItem(k, val);
      stored[k] = val;
    }
  });
  // Also push to dataLayer so GTM can read them
  if (Object.keys(stored).length) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'utm_captured', ...stored });
  }
})();
```

Create GTM Variables for each UTM key reading from `sessionStorage`:
- Variable Type: `1st-Party Cookie` OR `JavaScript Variable`
- `ssUTM_source` → reads `sessionStorage.getItem('utm_source')`
- Repeat for each `utm_*` key

---

## ② GA4 Base Configuration

### GTM Tag: GA4 Configuration

Create one GA4 Configuration tag that fires on all pages:

```
Tag: GA4 — Configuration
Type: Google Tag (GA4)
Measurement ID: {{Constant — GA4 Measurement ID}}
Config Parameters:
  user_id          →  {{DLV — user_id}}       (if logged in)
  account_type     →  {{DLV — account_type}}  (buyer | supplier | unknown)
  aviation_segment →  {{DLV — aviation_segment}}
  membership_tier  →  {{DLV — membership_tier}}
Trigger: All Pages
```

Push user identity to dataLayer on login/session load (in your app):

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'user_identified',
  user_id: user.id,                        // your internal ID — never PII
  account_type: user.accountType,          // 'buyer' | 'supplier'
  aviation_segment: user.aviationSegment,  // 'MRO' | 'airline' | 'distributor' etc.
  membership_tier: user.membershipTier     // 'free' | 'basic' | 'premium'
});
```

### Custom Dimensions in GA4

Register these before sending events — parameters not registered as dimensions get discarded after 60 days.

`GA4 → Admin → Custom Definitions → Custom Dimensions → Create`

**User-scoped:**

| Dimension Name | Parameter Name | Scope |
|---|---|---|
| Account Type | `account_type` | User |
| Aviation Segment | `aviation_segment` | User |
| Membership Tier | `membership_tier` | User |
| Company Name | `company_name` | User |

**Event-scoped:**

| Dimension Name | Parameter Name | Scope |
|---|---|---|
| Part Number | `part_number` | Event |
| ATA Code | `ata_code` | Event |
| Supplier ID | `supplier_id` | Event |
| AOG Flag | `is_aog` | Event |
| Source Country | `source_country` | Event |

---

## ③ Conversion Events

These are the highest-priority events. Mark each as a Conversion in `GA4 → Admin → Conversions` after implementation.

---

### `rfq_submitted` — CRITICAL (Server-Side Required)

**Why server-side:** Ad blockers kill ~20–30% of client-side conversion fires. An RFQ is the highest-intent buyer action — losing 30% of them corrupts your attribution data.

**Implementation:**

**App code (client-side — fires via dataLayer):**
```javascript
// On successful RFQ form submission
window.dataLayer.push({
  event: 'rfq_submitted',
  part_number: rfq.partNumber,
  ata_code: rfq.ataCode,
  quantity: rfq.quantity,
  supplier_id: rfq.supplierId,
  source_page: window.location.pathname,
  user_id: currentUser?.id || null
});
```

**GTM Tag:**
```
Tag: GA4 — rfq_submitted
Type: GA4 Event
Event Name: rfq_submitted
Parameters:
  part_number  →  {{DLV — part_number}}
  ata_code     →  {{DLV — ata_code}}
  quantity     →  {{DLV — quantity}}
  supplier_id  →  {{DLV — supplier_id}}
  source_page  →  {{DLV — source_page}}
Trigger: Custom Event — "rfq_submitted"
```

**Server-side (Node.js / your backend):**
```javascript
// Fire after successful RFQ save to database
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
// OR use the Measurement Protocol v2:
await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA4_ID}&api_secret=${API_SECRET}`, {
  method: 'POST',
  body: JSON.stringify({
    client_id: req.cookies._ga?.replace('GA1.1.', '') || generateClientId(),
    events: [{
      name: 'rfq_submitted',
      params: {
        part_number: rfq.partNumber,
        ata_code: rfq.ataCode,
        quantity: rfq.quantity,
        supplier_id: rfq.supplierId,
        engagement_time_msec: 1
      }
    }]
  })
});
```

**Mark as conversion:** Yes — highest priority

---

### `demo_requested` — CRITICAL

**App code:**
```javascript
window.dataLayer.push({
  event: 'demo_requested',
  company_name: form.companyName,
  company_size: form.companySize,
  aviation_segment: form.aviationSegment,
  source_page: window.location.pathname
});
```

**GTM Tag:**
```
Tag: GA4 — demo_requested
Event Name: demo_requested
Parameters:
  company_name     →  {{DLV — company_name}}
  company_size     →  {{DLV — company_size}}
  aviation_segment →  {{DLV — aviation_segment}}
  source_page      →  {{DLV — source_page}}
Trigger: Custom Event — "demo_requested"
```

**Mark as conversion:** Yes

---

### `contact_supplier_clicked` — CRITICAL

**App code:**
```javascript
// On "Contact Supplier" button click
window.dataLayer.push({
  event: 'contact_supplier_clicked',
  supplier_id: supplier.id,
  part_number: currentPart?.partNumber || null,
  contact_method: 'email' // or 'phone', 'rfq', 'message'
});
```

**GTM Tag:**
```
Tag: GA4 — contact_supplier_clicked
Event Name: contact_supplier_clicked
Parameters:
  supplier_id    →  {{DLV — supplier_id}}
  part_number    →  {{DLV — part_number}}
  contact_method →  {{DLV — contact_method}}
Trigger: Custom Event — "contact_supplier_clicked"
```

**Mark as conversion:** Yes

---

### `membership_signup_started`

```javascript
window.dataLayer.push({
  event: 'membership_signup_started',
  membership_type: plan.type,   // 'basic' | 'premium'
  page_location: window.location.pathname,
  source: document.referrer || 'direct'
});
```

**Mark as conversion:** No (start event, not completion)

---

### `membership_purchase_completed` — Server-Side Required

```javascript
// CLIENT — in payment success handler
window.dataLayer.push({
  event: 'membership_purchase_completed',
  membership_type: purchase.type,
  value: purchase.amount,
  currency: 'USD',
  transaction_id: purchase.transactionId  // deduplicate refires
});

// SERVER — in webhook/payment processor callback
// Use same Measurement Protocol v2 pattern as rfq_submitted
// Include transaction_id to prevent double-counting
```

**GTM Tag:**
```
Tag: GA4 — membership_purchase_completed
Event Name: purchase  ← use GA4's standard purchase event name
Parameters:
  transaction_id →  {{DLV — transaction_id}}
  value          →  {{DLV — value}}
  currency       →  {{DLV — currency}}
  items: [{
    item_id:   {{DLV — membership_type}},
    item_name: {{DLV — membership_type}},
    price:     {{DLV — value}}
  }]
Trigger: Custom Event — "membership_purchase_completed"
```

**Mark as conversion:** Yes — set value to `{{DLV — value}}`

---

### `aog_inquiry` — CRITICAL + Alert Required

```javascript
window.dataLayer.push({
  event: 'aog_inquiry',
  part_number: inquiry.partNumber,
  airline_name: inquiry.airline,
  contact_method: inquiry.method,  // 'form' | 'phone' | 'chat'
  is_aog: true
});
```

**HubSpot alert automation:** Create a HubSpot workflow triggered by `aog_inquiry` event received via HubSpot tracking code → create contact activity → notify assigned rep via email + Slack within 5 minutes. AOG events cost airlines $10k–$150k/hour — 5-minute response is the expectation.

**Mark as conversion:** Yes

---

## ④ Engagement Events

---

### `part_search_performed`

```javascript
// On search submit (not on every keystroke)
window.dataLayer.push({
  event: 'part_search_performed',
  search_term: query.term,
  results_count: results.total,
  ata_code: query.ataCode || null,
  part_number: query.partNumber || null
});
```

**Note:** This is your richest product intelligence signal. `search_term` data feeds the SEO content calendar (what buyers search that we don't rank for) and supplier acquisition (what parts we can't fulfill).

---

### `search_no_results`

```javascript
// Fire when results_count === 0
window.dataLayer.push({
  event: 'search_no_results',
  search_term: query.term,
  part_number: query.partNumber || null,
  ata_code: query.ataCode || null
});
```

**Automation:** Build a GA4 → Looker Studio report (or GA4 Explorer report) showing top `search_no_results` terms weekly. Pipe to supplier acquisition team — these are buyer needs we can't serve, which are outbound targets.

---

### `supplier_listing_viewed`

```javascript
window.dataLayer.push({
  event: 'supplier_listing_viewed',
  supplier_id: supplier.id,
  supplier_name: supplier.name,
  aviation_segment: supplier.segment,
  source: document.referrer || 'direct'
});
```

---

### `part_detail_viewed`

```javascript
window.dataLayer.push({
  event: 'part_detail_viewed',
  part_number: part.partNumber,
  ata_code: part.ataCode,
  supplier_id: part.supplierId,
  condition: part.condition   // 'new' | 'overhauled' | 'serviceable' | 'as-removed'
});
```

---

## ⑤ CookiePro → GA4 Advanced Consent Mode

**Why Advanced Consent Mode:** Under GDPR, visitors who decline cookies = zero data in basic mode. With Advanced Consent Mode, GA4 uses modeled/aggregated signals to estimate behavior from non-consented users. You'll recover ~40–60% of EU traffic data. Without this, EU traffic is invisible.

### Step 1 — Enable Consent Mode in GTM

Create a new GTM Tag that fires before all other tags:

```
Tag: Consent Initialization — CookiePro
Type: Custom HTML
HTML:
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    // Set default consent state — all denied until CookiePro loads
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500  // wait 500ms for CookiePro to load
    });
    
    // Enable URL passthrough (captures ad click data without cookies)
    gtag('set', 'url_passthrough', true);
    // Enable ads data redaction (hides ad click IDs when ad_storage denied)
    gtag('set', 'ads_data_redaction', true);
  </script>

Trigger: Consent Initialization (fires before all other tags)
Tag Sequencing: Fire this tag before GA4 Configuration tag
```

### Step 2 — CookiePro Consent Update Listener

```
Tag: Consent Update — CookiePro
Type: Custom HTML
HTML:
  <script>
    // CookiePro fires OptanonWrapper when consent changes
    function OptanonWrapper() {
      // CookiePro category IDs — verify these match your CookiePro setup:
      // C0001 = Strictly Necessary
      // C0002 = Performance (Analytics)
      // C0003 = Functional
      // C0004 = Targeting/Advertising
      
      var analyticsConsent = OnetrustActiveGroups.indexOf('C0002') > -1 ? 'granted' : 'denied';
      var adConsent = OnetrustActiveGroups.indexOf('C0004') > -1 ? 'granted' : 'denied';
      
      gtag('consent', 'update', {
        'analytics_storage': analyticsConsent,
        'ad_storage': adConsent,
        'ad_user_data': adConsent,
        'ad_personalization': adConsent
      });
      
      window.dataLayer.push({ event: 'consent_updated' });
    }
  </script>

Trigger: DOM Ready (All Pages)
```

### Step 3 — Verify in GTM Preview

1. Open GTM Preview on `partsbase.com`
2. Decline all cookies in CookiePro banner
3. In GTM Preview: `Consent Initialization` tag should fire first, with `analytics_storage: denied`
4. Accept cookies → `consent_updated` event should fire with `analytics_storage: granted`
5. In GA4 DebugView: events should now appear after consent is granted

### Expected consent rates by region

| Region | Expected Consent Rate | GA4 Data Coverage |
|---|---|---|
| US | 85–95% | Near full |
| EU | 60–75% | ~60% direct + ~20% modeled |
| Middle East | 70–80% | Good |
| APAC | 75–85% | Good |

---

## ⑥ Google Ads Conversion Tracking

### Recommended approach: Import GA4 conversions (single source of truth)

Avoid the Google Ads tag + GA4 parallel setup — it creates duplicate conversion counting.

**In Google Ads:**
1. `Tools → Measurement → Conversions → New conversion action`
2. Select `Import → Google Analytics 4 properties`
3. Import these GA4 conversions:
   - `rfq_submitted` → Attribution: Data-Driven (or Last Click if <50/mo)
   - `demo_requested` → Attribution: Data-Driven
   - `membership_purchase_completed` → Attribution: Data-Driven, Value: use transaction value
   - `contact_supplier_clicked` → Attribution: Last Click (micro-conversion)

**Conversion windows:**
- `rfq_submitted`: 30 days (buyer urgency is high — short consideration)
- `demo_requested`: 30 days
- `membership_purchase_completed`: 90 days (sales cycle consideration)

**View-through conversion window:** 1 day (conservative — PartsBase is a considered purchase)

### Google Ads remarketing tag

```
Tag: Google Ads — Remarketing
Type: Google Ads Remarketing
Conversion ID: [from Google Ads account]
Trigger: All Pages

Tag: Google Ads — Purchase Conversion
Type: Google Ads Conversion Tracking
Conversion ID: [from Google Ads]
Conversion Label: [from Google Ads]
Conversion Value: {{DLV — value}}
Transaction ID: {{DLV — transaction_id}}
Trigger: Custom Event — "membership_purchase_completed"
```

---

## ⑦ LinkedIn Ads Conversion Tracking

### LinkedIn Insight Tag

```
Tag: LinkedIn — Insight Tag
Type: Custom HTML
HTML:
  <script type="text/javascript">
    _linkedin_partner_id = "[YOUR_PARTNER_ID]";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    (function(l) {
      if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
      window.lintrk.q=[]}
      var s = document.getElementsByTagName("script")[0];
      var b = document.createElement("script");
      b.type = "text/javascript";b.async = true;
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode.insertBefore(b, s);})(window.lintrk);
  </script>
  <noscript>
    <img height="1" width="1" style="display:none;" alt=""
      src="https://px.ads.linkedin.com/collect/?pid=[YOUR_PARTNER_ID]&fmt=gif" />
  </noscript>
Trigger: All Pages
```

### LinkedIn conversion events

```
Tag: LinkedIn — demo_requested
Type: Custom HTML
HTML:
  <script>
    window.lintrk('track', { conversion_id: [LINKEDIN_CONVERSION_ID_DEMO] });
  </script>
Trigger: Custom Event — "demo_requested"

Tag: LinkedIn — rfq_submitted
Type: Custom HTML
HTML:
  <script>
    window.lintrk('track', { conversion_id: [LINKEDIN_CONVERSION_ID_RFQ] });
  </script>
Trigger: Custom Event — "rfq_submitted"
```

**Set up conversion actions in LinkedIn Campaign Manager:**
- `Campaign Manager → Analyze → Conversion Tracking → Create Conversion`
- One conversion per action (demo, RFQ, membership)
- Attribution window: 30-day click, 7-day view

---

## ⑧ Meta Pixel (Vector Retargeting)

Vector identifies visitors → exports to Meta Custom Audiences. The Meta Pixel handles event tracking for Meta ad optimization.

### Meta Pixel base tag

```
Tag: Meta Pixel — Base
Type: Custom HTML
HTML:
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '[YOUR_PIXEL_ID]');
    fbq('track', 'PageView');
  </script>
Trigger: All Pages
```

### Meta standard events (for ad optimization)

```javascript
// demo_requested → Meta "Lead" event
Tag Trigger: Custom Event — "demo_requested"
Tag HTML: <script>fbq('track', 'Lead');</script>

// rfq_submitted → Meta "Lead" event  
Tag Trigger: Custom Event — "rfq_submitted"
Tag HTML: <script>fbq('track', 'Lead', {content_name: 'RFQ'});</script>

// membership_purchase_completed → Meta "Purchase" event
Tag Trigger: Custom Event — "membership_purchase_completed"  
Tag HTML: 
  <script>
    fbq('track', 'Purchase', {
      value: {{DLV — value}},
      currency: 'USD'
    });
  </script>
```

### Meta CAPI (Conversions API) — Recommended

Client-side pixel loses ~30% of conversions (iOS, ad blockers). CAPI sends events server-side directly to Meta.

```javascript
// In your server — fire on same events as client pixel
const bizSdk = require('facebook-nodejs-business-sdk');
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;

async function sendMetaEvent(eventName, userData, customData) {
  const ud = (new UserData())
    .setEmails([userData.email])    // hashed automatically
    .setClientIpAddress(userData.ip)
    .setClientUserAgent(userData.userAgent);
    
  const event = (new ServerEvent())
    .setEventName(eventName)
    .setEventTime(Math.floor(Date.now() / 1000))
    .setUserData(ud)
    .setCustomData(customData)
    .setActionSource('website');
    
  const er = (new EventRequest(ACCESS_TOKEN, PIXEL_ID))
    .setEvents([event]);
    
  return er.execute();
}

// On RFQ submission:
await sendMetaEvent('Lead', { email: user.email, ip: req.ip, userAgent: req.headers['user-agent'] }, {});

// On membership purchase:
await sendMetaEvent('Purchase', { email: user.email }, { value: purchase.amount, currency: 'USD' });
```

---

## ⑨ HubSpot ↔ GA4 Integration

### HubSpot tracking code via GTM

```
Tag: HubSpot — Tracking Code
Type: Custom HTML
HTML:
  <script type="text/javascript" id="hs-script-loader" async defer
    src="//js.hs-scripts.com/[YOUR_HUBSPOT_PORTAL_ID].js">
  </script>
Trigger: All Pages (fires after CookiePro consent is granted)
```

**Important:** Gate the HubSpot tag behind consent. Modify the trigger to only fire when `analytics_storage = granted` OR when CookiePro has received analytics consent.

### HubSpot Identity (link visitor to CRM contact)

```javascript
// When a user is logged in or has submitted a form
var _hsq = window._hsq = window._hsq || [];
_hsq.push(["identify", {
  email: user.email,
  id: user.id
}]);
```

### AOG Alert Workflow in HubSpot

When `aog_inquiry` fires → HubSpot receives the page activity via tracking code → trigger a workflow:

1. **Trigger:** Contact property `aog_inquiry_count` increases (via HubSpot custom event)
2. **Action 1:** Set contact property `Last AOG Inquiry Date` = today
3. **Action 2:** Create task for assigned rep — "AOG URGENT — respond within 5 min"
4. **Action 3:** Send internal email to `sales-aog@partsbase.com`
5. **Action 4:** Slack notification (via Zapier or HubSpot Slack integration) to `#sales-aog-alerts`

**Alternative — GTM-triggered webhook:**
```javascript
// When aog_inquiry fires in GTM, also POST to a HubSpot workflow webhook
Tag: AOG Alert — Webhook
Type: Custom HTML
HTML:
  <script>
    fetch('https://api.hsforms.com/submissions/v3/integration/webhook/[WORKFLOW_ID]', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        part_number: {{DLV — part_number}},
        airline_name: {{DLV — airline_name}},
        timestamp: new Date().toISOString()
      })
    });
  </script>
Trigger: Custom Event — "aog_inquiry"
```

### Weekly Search No-Results Report

```
GA4 → Explore → Free Form Report
Dimension: Event Name = search_no_results → Custom Event Parameter: search_term
Metric: Event Count
Date Range: Last 7 days
Sort: Event Count descending
Share: Schedule delivery to supplier-acquisition@partsbase.com every Monday
```

---

## ⑩ GTM Variable Setup Reference

Create these Data Layer Variables (DLV) in GTM for use across all tags:

| Variable Name | Data Layer Key | Type |
|---|---|---|
| DLV — user_id | `user_id` | Data Layer Variable |
| DLV — account_type | `account_type` | Data Layer Variable |
| DLV — aviation_segment | `aviation_segment` | Data Layer Variable |
| DLV — membership_tier | `membership_tier` | Data Layer Variable |
| DLV — part_number | `part_number` | Data Layer Variable |
| DLV — ata_code | `ata_code` | Data Layer Variable |
| DLV — supplier_id | `supplier_id` | Data Layer Variable |
| DLV — search_term | `search_term` | Data Layer Variable |
| DLV — results_count | `results_count` | Data Layer Variable |
| DLV — quantity | `quantity` | Data Layer Variable |
| DLV — source_page | `source_page` | Data Layer Variable |
| DLV — company_name | `company_name` | Data Layer Variable |
| DLV — company_size | `company_size` | Data Layer Variable |
| DLV — value | `value` | Data Layer Variable |
| DLV — currency | `currency` | Data Layer Variable |
| DLV — transaction_id | `transaction_id` | Data Layer Variable |
| DLV — contact_method | `contact_method` | Data Layer Variable |
| DLV — is_aog | `is_aog` | Data Layer Variable |
| DLV — membership_type | `membership_type` | Data Layer Variable |
| Constant — GA4 Measurement ID | `G-XXXXXXXXXX` | Constant |
| Page URL | (built-in) | Built-in Variable |
| Page Title | (built-in) | Built-in Variable |
| Page Path | (built-in) | Built-in Variable |

---

## ⑪ Internal Traffic Filter

Exclude Dan's traffic and any PartsBase office IPs from GA4 data.

`GA4 → Admin → Data Filters → Create Filter → Internal Traffic`

1. Add your current IP address
2. Add office IP ranges (get from IT/Sergio Corona)
3. Set filter state to **Active** (starts in Testing — don't forget to activate)

In GTM — also add a tag exception for localhost/staging:

```
All GA4 tags → Exception trigger:
  Condition: Page Hostname does NOT contain "partsbase.com"
  (blocks firing on localhost, staging.partsbase.com, etc.)
```

---

## ⑫ Validation Checklist

Run through this after each implementation phase. Everything must be green before calling a phase done.

### Phase 1: SPA Fix (Day 7)

- [ ] Navigate between 5 pages on `partsbase.com` using site nav
- [ ] GTM Preview confirms `History Change` trigger fires on each navigation
- [ ] GA4 DebugView shows `page_view` with correct `page_location` and `page_title` per route
- [ ] No duplicate `page_view` events (check Network tab for double hits)
- [ ] UTM params persist after SPA navigation (check `sessionStorage` in DevTools)
- [ ] Set UTM naming convention doc to the team

### Phase 2: Base Configuration (Day 10)

- [ ] GA4 Configuration tag fires on page load with user properties when logged in
- [ ] Custom Dimensions registered in GA4 (all 9)
- [ ] Internal traffic filter active — your own sessions not appearing in GA4

### Phase 3: Conversion Events (Day 14)

- [ ] `rfq_submitted` fires in GTM Preview on test RFQ submission
- [ ] `rfq_submitted` fires in GA4 DebugView with all parameters
- [ ] `rfq_submitted` fires server-side via Measurement Protocol (check GA4 Events in Realtime)
- [ ] `demo_requested` fires on form submit with correct parameters
- [ ] `contact_supplier_clicked` fires on button click
- [ ] `membership_purchase_completed` fires client + server-side with transaction_id
- [ ] `aog_inquiry` fires and HubSpot alert workflow triggers
- [ ] All 5 conversion events marked as conversions in GA4

### Phase 4: Engagement Events (Day 21)

- [ ] `part_search_performed` fires on search submit (not on keystroke)
- [ ] `search_no_results` fires when results count = 0
- [ ] `supplier_listing_viewed` fires on supplier page load
- [ ] `part_detail_viewed` fires on part page load
- [ ] `membership_signup_started` fires on signup CTA click

### Phase 5: Consent Mode (Day 21)

- [ ] Decline cookies → GTM Preview shows `analytics_storage: denied`
- [ ] Accept cookies → `consent_updated` event fires, `analytics_storage: granted`
- [ ] GA4 events DO NOT fire before consent is granted (check Network tab)
- [ ] GA4 Consent Mode report shows modeled users in EU traffic

### Phase 6: Ad Platforms (Day 28)

- [ ] Google Ads: GA4 conversions imported and showing "Recording" status
- [ ] LinkedIn Insight Tag fires on all pages (check in LinkedIn Campaign Manager → Insight Tag Status)
- [ ] LinkedIn conversion events fire on demo and RFQ
- [ ] Meta Pixel fires PageView on load, Lead on demo/RFQ, Purchase on membership
- [ ] Meta CAPI test events show in Meta Events Manager with dedup matching client events

### Phase 7: HubSpot (Day 35)

- [ ] HubSpot tracking code fires (consent-gated)
- [ ] Contact identity pushed on login
- [ ] AOG alert workflow triggers within 5 minutes of `aog_inquiry` event
- [ ] Weekly `search_no_results` report scheduled in GA4 Explore

---

## Proactive Flags 🚩

Issues to watch for during implementation:

| Flag | Symptom | Fix |
|---|---|---|
| **Double page_view events** | GA4 shows 2× session count | Disable Enhanced Measurement page views; keep only History Change tag |
| **UTM source = (direct) for paid** | Campaign data disappears after first page | UTM persistence script not installed — sessions strip params on SPA nav |
| **rfq_submitted not appearing in GA4** | Conversion data gap | Ad blocker killed client-side hit; ensure server-side Measurement Protocol is firing |
| **EU traffic drops to near zero** | All EU = (not set) in GA4 | Consent Mode not configured — EU visitors blocking analytics |
| **GA4 says 0 conversions, Ads shows 50** | Attribution mismatch | Check if Google Ads tag is running alongside GA4 import — dedup issue |
| **HubSpot contact identity not matching** | Contacts show as anonymous | `_hsq.push(["identify"...])` not firing after login |
| **aog_inquiry fires but no HubSpot alert** | Alert workflow silent | HubSpot tracking code not receiving the event — check consent gating |
| **All pages show same page_title** | SPA not updating `document.title` | App needs to update document.title on route change, or pass title explicitly in dataLayer |

---

## Quick Reference: Event → Platform Matrix

| Event | GA4 | Google Ads | LinkedIn | Meta | HubSpot |
|---|---|---|---|---|---|
| `page_view` (SPA) | ✅ | — | — | PageView | ✅ |
| `rfq_submitted` | ✅ Conversion | ✅ Import | ✅ | Lead + CAPI | ✅ Activity |
| `demo_requested` | ✅ Conversion | ✅ Import | ✅ | Lead + CAPI | ✅ Activity |
| `contact_supplier_clicked` | ✅ Conversion | ✅ Import | — | — | ✅ Activity |
| `membership_purchase_completed` | ✅ Conversion | ✅ Import | — | Purchase + CAPI | ✅ Deal |
| `aog_inquiry` | ✅ Conversion | — | — | — | ✅ Alert Workflow |
| `part_search_performed` | ✅ | — | — | — | — |
| `search_no_results` | ✅ | — | — | — | — (weekly report) |
| `supplier_listing_viewed` | ✅ | — | — | — | — |
| `part_detail_viewed` | ✅ | — | — | — | — |
| `membership_signup_started` | ✅ | — | — | — | ✅ Activity |

---

## Files & Scripts

| Resource | Location |
|---|---|
| Tracking config (events + parameters) | `resources/partsbase-tracking-config.json` |
| Tracking plan generator script | `scripts/tracking_plan_generator.py` |
| This implementation guide | `resources/analytics-tracking-implementation.md` |
| UTM naming convention | `resources/partsbase-marketing-strategy.md` § 5 |

---

*Confidence: 🟢 Implementation patterns verified · 🟡 CookiePro category IDs estimated — verify against your CookiePro account · 🟡 LinkedIn/Meta pixel IDs placeholder — retrieve from ad accounts*
