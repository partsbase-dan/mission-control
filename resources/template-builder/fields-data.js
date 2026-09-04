// Field definitions for the Template Builder tool.
// Each template maps to a master HTML file (fetched from ./resources/template-builder/masters/)
// and an ordered list of fields. Each field has one or more `apply` operations telling the
// generator exactly which element(s) in the fetched template to update, and how.
//
// apply[].op:
//   'text'  - sets el.textContent (browser handles escaping)
//   'attr'  - sets an attribute (href/src) on el
//   'html'  - sets el.innerHTML from a `build(lines)` function (must escape manually via esc())
// apply[].index - when a field's value has multiple lines (split on \n), use lines[index]
//                 instead of the whole value. Omit to use the whole value.
// apply[].syncRaw - also do a raw string swap (old value -> new value) across the whole
//                   document text, to keep an MSO-only conditional-comment duplicate in sync
//                   (Outlook-only fallback markup that a DOM parser can't see or edit).

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TEMPLATES = [
  {
    id: "pbexpo",
    name: "PBExpo Sponsorship Push",
    master: "resources/template-builder/masters/pbexpo.html",
    outputName: "pbexpo-sponsorship-push.html",
    use: "Self-serve sponsorship push — drives PBExpo prospects to buy a sponsorship package directly, no rep required.",
    fields: [
      { id: "header-img", label: "Top header banner — image URL", type: "url", hint: "Static decorative banner, not clickable. 660px wide. Paste a HubSpot-hosted image URL.",
        apply: [{ selector: 'img[data-block-id="3"]', op: "attr", attr: "src", syncRaw: true }] },

      { id: "hero-link", label: "Hero CTA banner — link URL", type: "url", hint: "Where the hero banner sends people (e.g. the sponsorship product grid).",
        apply: [{ selector: 'a[data-block-id="233"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "hero-img", label: "Hero CTA banner — image URL", type: "url", hint: "660px wide.",
        apply: [{ selector: 'a[data-block-id="233"] img', op: "attr", attr: "src", syncRaw: true }] },

      { id: "headline", label: "Section headline", type: "text", hint: "One line naming what this email is selling. ~5–8 words.", example: "Sponsorship opportunities at PBExpo 2027",
        apply: [{ selector: "#d220", op: "html", build: (l) => `<h2 style="line-height: 1; mso-line-height-alt: 100%; text-align: center;" class="last-child"><span style="font-size: 22px"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(l[0])}</span></span></h2>` } ] },

      { id: "pitch", label: "Pitch paragraph(s)", type: "textarea", hint: "One line per paragraph. Two short lines: what the offer is, and what makes it easy.", example: "You don't have to exhibit to put your brand in front of PBExpo buyers. Sponsorship opportunities are open now, self-serve, from a $250 drink ticket to a $26,000 water station.\nBrowse every sponsorship opportunity and check out in minutes. No rep, no wait.",
        apply: [{ selector: "#d239", op: "html", build: (l) => l.map(p => `<p style="text-align: left;"><span style="color:rgb(0, 0, 0);"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(p)}</span></span></p>`).join("") } ] },

      { id: "btn1-text", label: "Primary button text", type: "text", hint: "Verb-first, matches the hero banner link.", example: "Shop Sponsorships",
        apply: [{ selector: 'a[data-button-link-id="290"]', op: "text", syncRaw: true }] },

      { id: "sub-headline", label: "Sub-section headline", type: "text", hint: "Introduces the featured-items grid below it.", example: "Boost your presence at PBExpo 2027",
        apply: [{ selector: "#d254", op: "html", build: (l) => `<h2 style="line-height: 1; mso-line-height-alt: 100%; text-align: center;" class="last-child"><span style="font-size: 22px"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(l[0])}</span></span></h2>` } ] },

      { id: "grid1-link", label: "Featured image 1 — link URL", type: "url", apply: [{ selector: 'a[data-block-id="285"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "grid1-img", label: "Featured image 1 — image URL", type: "url", hint: "628px wide. Used last time: coffee station.", apply: [{ selector: 'a[data-block-id="285"] img', op: "attr", attr: "src", syncRaw: true }] },
      { id: "grid2-link", label: "Featured image 2 — link URL", type: "url", apply: [{ selector: 'a[data-block-id="303"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "grid2-img", label: "Featured image 2 — image URL", type: "url", hint: "628px wide. Used last time: aisle sign.", apply: [{ selector: 'a[data-block-id="303"] img', op: "attr", attr: "src", syncRaw: true }] },
      { id: "grid3-link", label: "Featured image 3 — link URL", type: "url", apply: [{ selector: 'a[data-block-id="304"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "grid3-img", label: "Featured image 3 — image URL", type: "url", hint: "628px wide. Used last time: demo stage.", apply: [{ selector: 'a[data-block-id="304"] img', op: "attr", attr: "src", syncRaw: true }] },
      { id: "grid4-link", label: "Featured image 4 — link URL", type: "url", apply: [{ selector: 'a[data-block-id="305"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "grid4-img", label: "Featured image 4 — image URL", type: "url", hint: "628px wide. Used last time: keynote main stage.", apply: [{ selector: 'a[data-block-id="305"] img', op: "attr", attr: "src", syncRaw: true }] },

      { id: "preview-line", label: "“See everything” line(s)", type: "textarea", hint: "One line per paragraph. Tells the reader this is a preview and closes with a stat.", example: "That's a preview, not the full list. See every sponsorship opportunity, from $250 to $26,000.\nPBExpo 2027 is projecting 7,000+ attendees and 4,000+ companies on the floor. That's visibility in front of buyers who are already headed your way.",
        apply: [{ selector: "#d255", op: "html", build: (l) => l.map(p => `<p style="text-align: left;"><span style="color:rgb(0, 0, 0);"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(p)}</span></span></p>`).join("") } ] },

      { id: "booth-link", label: "“Buy a booth” banner — link URL", type: "url", apply: [{ selector: 'a[data-block-id="292"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "booth-img", label: "“Buy a booth” banner — image URL", type: "url", hint: "660px wide.", apply: [{ selector: 'a[data-block-id="292"] img', op: "attr", attr: "src", syncRaw: true }] },

      { id: "fine-print", label: "Offer fine print", type: "textarea", hint: "Legal/terms line for any bundled promo. Update the date and terms link each time.", example: "*Offer ends 8/31/2026. Gift-with-purchase, no drawing, one placement per qualifying booth.",
        apply: [{ selector: "#d230", op: "html", build: (l) => `<p style="line-height: 1; mso-line-height-alt: 100%; text-align: justify;" class="last-child"><span style="color:rgb(0, 0, 0);"><span style="font-size: 12px">${esc(l.join(" "))}</span></span></p>` } ] },

      { id: "reg-headline", label: "Registration headline", type: "text", hint: "Pivots the email from sponsorship to general registration.", example: "PBExpo keeps growing. There's more than one way to be part of it.",
        apply: [{ selector: "#d297", op: "html", build: (l) => `<h2 style="line-height: 1; mso-line-height-alt: 100%; text-align: center;" class="last-child"><span style="font-size: 22px"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(l[0])}</span></span></h2>` } ] },

      { id: "reg-pitch", label: "Registration pitch", type: "textarea", hint: "Registration is open, it's free, name the dates and city.", example: "Registration for PBExpo 2027 is open. It's free to attend, register today and save your seat for March 10–11, 2027 in Miami Beach.",
        apply: [{ selector: "#d298", op: "html", build: (l) => l.map(p => `<p style="text-align: left;" class="last-child"><span style="color:rgb(0, 0, 0);"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(p)}</span></span></p>`).join("") } ] },

      { id: "reg-link", label: "“Register Now” banner — link URL", type: "url", apply: [{ selector: 'a[data-block-id="299"]', op: "attr", attr: "href" }] },
      { id: "reg-img", label: "“Register Now” banner — image URL", type: "url", hint: "660px wide.", apply: [{ selector: 'a[data-block-id="299"] img', op: "attr", attr: "src", syncRaw: true }] },

      { id: "reg-caveat", label: "Registration caveat", type: "textarea", hint: "Clarifies who this link is for.", example: "Registration is only open to general attendees, airlines, and operators. Exhibitors do not register through this link.",
        apply: [{ selector: "#d306", op: "html", build: (l) => `<p style="line-height: 1; mso-line-height-alt: 100%; text-align: justify;" class="last-child"><span style="color:rgb(0, 0, 0);"><span style="font-size: 14px"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(l.join(" "))}</span></span></span></p>` } ] },

      { id: "sponsor-credit", label: "Sponsor credit (optional — leave blank if none)", type: "text", hint: "Only if a partner is sponsoring registration this cycle.", example: "Registration sponsored by Belmont Bank & Trust Company.",
        apply: [{ selector: "#d307", op: "html", build: (l) => l[0] ? `<p style="line-height: 1; mso-line-height-alt: 100%; text-align: justify;" class="last-child"><span style="color:rgb(0, 0, 0);"><span style="font-size: 12px">${esc(l[0])}</span></span></p>` : "" } ] },
    ],
  },

  {
    id: "partstore",
    name: "PartStore Pay-by-Invoice",
    master: "resources/template-builder/masters/partstore.html",
    outputName: "partstore-feature-launch.html",
    use: "Feature-launch announcement — explains a new PartStore capability, walks through how to activate it, and closes with a named human contact.",
    fields: [
      { id: "logo-img", label: "Nav logo — image URL", type: "url", hint: "122×24px.", apply: [{ selector: "#tb-logo-img", op: "attr", attr: "src" }] },
      { id: "logo-link", label: "Nav logo — link URL", type: "url", apply: [{ selector: "#tb-logo-link", op: "attr", attr: "href" }] },
      { id: "eyebrow", label: "Header eyebrow label", type: "text", example: "PAY-BY-INVOICE IS LIVE", apply: [{ selector: "#tb-eyebrow", op: "text" }] },

      { id: "headline", label: "Two-line headline (one line per input line)", type: "textarea", hint: "Line 1: sets up a familiar moment. Line 2: delivers the payoff.", example: "You found the part.\nNow you have the terms.",
        apply: [{ selector: "#tb-headline-1", op: "text", index: 0 }, { selector: "#tb-headline-2", op: "text", index: 1 }] },

      { id: "pitch", label: "Opening pitch", type: "textarea", example: "Pay-by-Invoice is live on PartStore. One credit line, Net-30, across 400+ sellers — at zero cost to you. No interest, no fees, no surcharges.",
        apply: [{ selector: "#tb-pitch", op: "html", build: (l) => `<span style="font-family:'Roboto', Arial, Helvetica, sans-serif; font-size:16px; font-weight:normal; color:#333333; line-height:25px;">${esc(l.join(" "))}</span>` } ] },

      { id: "video-link", label: "Video thumbnail — link URL", type: "url", hint: "Applies to both the thumbnail and the caption link.",
        apply: [{ selector: "#tb-video-link-1", op: "attr", attr: "href" }, { selector: "#tb-video-link-2", op: "attr", attr: "href" }] },
      { id: "video-img", label: "Video thumbnail — image URL", type: "url", hint: "532px wide.", apply: [{ selector: "#tb-video-img", op: "attr", attr: "src" }] },
      { id: "video-caption", label: "Video caption text", type: "text", example: "Watch the 4-minute walkthrough ›", apply: [{ selector: "#tb-video-caption", op: "text" }] },

      { id: "stat1-value", label: "Stat 1 — value", type: "text", example: "Net-30", apply: [{ selector: "#tb-stat1-value", op: "text" }] },
      { id: "stat1-caption", label: "Stat 1 — caption", type: "text", example: "Thirty days to pay, on every purchase", apply: [{ selector: "#tb-stat1-caption", op: "text" }] },
      { id: "stat2-value", label: "Stat 2 — value", type: "text", example: "$0", apply: [{ selector: "#tb-stat2-value", op: "text" }] },
      { id: "stat2-caption", label: "Stat 2 — caption", type: "text", example: "No interest, fees or surcharges", apply: [{ selector: "#tb-stat2-caption", op: "text" }] },
      { id: "stat3-value", label: "Stat 3 — value", type: "text", example: "400+", apply: [{ selector: "#tb-stat3-value", op: "text" }] },
      { id: "stat3-caption", label: "Stat 3 — caption", type: "text", example: "Sellers on one credit line", apply: [{ selector: "#tb-stat3-caption", op: "text" }] },

      { id: "problem-headline", label: "Problem headline", type: "text", example: "Stop earning terms one seller at a time", apply: [{ selector: "#tb-problem-headline", op: "text" }] },
      { id: "problem-para1", label: "Problem paragraph", type: "textarea", example: "Right now, a new supplier means a new credit application, new trade references and a new vendor to set up — so most buyers stay inside a short list of sellers they already have terms with, and pay more to do it.",
        apply: [{ selector: "#tb-problem-para1", op: "html", build: (l) => `<span style="font-family:'Roboto', Arial, Helvetica, sans-serif; font-size:15px; font-weight:normal; color:#333333; line-height:24px;">${esc(l.join(" "))}</span>` } ] },
      { id: "problem-para2", label: "Solution paragraph", type: "textarea", example: "Apply once, and your line is portable across every participating seller on PartStore. Your AP team still gets an invoice per seller, matched to each PO — but you make one payment, to one payee.",
        apply: [{ selector: "#tb-problem-para2", op: "html", build: (l) => `<span style="font-family:'Roboto', Arial, Helvetica, sans-serif; font-size:15px; font-weight:normal; color:#333333; line-height:24px;">${esc(l.join(" "))}</span>` } ] },

      { id: "midbtn-text", label: "Mid-page button text", type: "text", example: "Apply now — takes 5 minutes", apply: [{ selector: "#tb-midbtn-text", op: "text" }] },
      { id: "midbtn-link", label: "Mid-page button link URL", type: "url", apply: [{ selector: "#tb-midbtn-link", op: "attr", attr: "href" }] },
      { id: "disclaimer", label: "Button disclaimer", type: "text", example: "Soft credit check — it will not affect your credit history.", apply: [{ selector: "#tb-disclaimer", op: "text" }] },

      { id: "howto-headline", label: "“How to apply” headline", type: "text", example: "How to apply", apply: [{ selector: "#tb-howto-headline", op: "text" }] },
      { id: "step1", label: "Step 1", type: "text", example: "Click PartStore in your PartsBase top navigation", apply: [{ selector: "#tb-step-1", op: "html", build: (l) => `<span style="font-family:'Roboto', Arial, Helvetica, sans-serif; font-size:15px; font-weight:normal; color:#002857; line-height:22px;">${esc(l[0])}</span>` } ] },
      { id: "step2", label: "Step 2", type: "text", example: "Choose Pay-by-Invoice in the left-hand menu", apply: [{ selector: "#tb-step-2", op: "html", build: (l) => `<span style="font-family:'Roboto', Arial, Helvetica, sans-serif; font-size:15px; font-weight:normal; color:#002857; line-height:22px;">${esc(l[0])}</span>` } ] },
      { id: "step3", label: "Step 3", type: "text", example: "Click Enroll in Balance, top right", apply: [{ selector: "#tb-step-3", op: "html", build: (l) => `<span style="font-family:'Roboto', Arial, Helvetica, sans-serif; font-size:15px; font-weight:normal; color:#002857; line-height:22px;">${esc(l[0])}</span>` } ] },
      { id: "step4", label: "Step 4", type: "text", example: "Complete the three-step application — you are approved on the spot", apply: [{ selector: "#tb-step-4", op: "html", build: (l) => `<span style="font-family:'Roboto', Arial, Helvetica, sans-serif; font-size:15px; font-weight:normal; color:#002857; line-height:22px;">${esc(l[0])}</span>` } ] },

      { id: "callout", label: "Reassurance callout box", type: "textarea", example: "If your starting limit comes back lower than you asked for, activate it anyway. You can start buying today, request an increase at any time, and using the line and repaying on time makes you eligible for automatic increases. There is no cost to holding a line you have not used yet.",
        apply: [{ selector: "#tb-callout", op: "html", build: (l) => `<span style="font-family:'Roboto', Arial, Helvetica, sans-serif; font-size:14px; font-weight:normal; color:#333333; line-height:22px;">${esc(l.join(" "))}</span>` } ] },

      { id: "closing-headline", label: "Closing card headline (one line per input line)", type: "textarea", example: "The day you need terms is never\nthe day you want to start an application.",
        apply: [{ selector: "#tb-closing-headline", op: "html", build: (l) => `<span style="font-family:'Roboto', Arial, Helvetica, sans-serif; font-size:16px; font-weight:normal; color:#FFFFFF; line-height:24px;">${l.map(esc).join("<br />")}</span>` } ] },
      { id: "closingbtn-text", label: "Closing button text", type: "text", example: "Start my application", apply: [{ selector: "#tb-closingbtn-text", op: "text" }] },
      { id: "closingbtn-link", label: "Closing button link URL", type: "url", apply: [{ selector: "#tb-closingbtn-link", op: "attr", attr: "href" }] },

      { id: "signoff-question", label: "Sign-off prompt", type: "text", example: "Questions before you apply? Reply to this email and I will get you an answer.", apply: [{ selector: "#tb-signoff-question", op: "text" }] },
      { id: "signoff-photo", label: "Sign-off headshot — image URL", type: "url", hint: "64×64px, circular crop.", apply: [{ selector: "#tb-signoff-photo", op: "attr", attr: "src" }] },
      { id: "signoff-name", label: "Sign-off name", type: "text", example: "Kevin Thomas", apply: [{ selector: "#tb-signoff-name", op: "text" }] },
      { id: "signoff-title", label: "Sign-off title", type: "text", example: "Vice President, Digital Aviation Commerce", apply: [{ selector: "#tb-signoff-title", op: "text" }] },
      { id: "signoff-email", label: "Sign-off email", type: "text", example: "kthomas@partsbase.com", apply: [{ selector: "#tb-signoff-email", op: "text" }] },
    ],
  },

  {
    id: "jumbo",
    name: "PB Jumbotron",
    master: "resources/template-builder/masters/jumbo.html",
    outputName: "pb-jumbotron.html",
    use: "Urgency-driven upsell — a limited-time perk (free jumbotron ad) tied to booth tier purchases, plus a secondary registration push.",
    fields: [
      { id: "header-img", label: "Top header banner — image URL", type: "url", hint: "660px wide, not clickable.", apply: [{ selector: 'img[data-block-id="3"]', op: "attr", attr: "src", syncRaw: true }] },
      { id: "hero-link", label: "Hero CTA banner — link URL", type: "url", apply: [{ selector: 'a[data-block-id="309"]', op: "attr", attr: "href", syncRaw: true }, { selector: 'a[data-block-id="311"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "hero-img", label: "Hero CTA banner — image URL", type: "url", hint: "660px wide.", apply: [{ selector: 'a[data-block-id="309"] img', op: "attr", attr: "src", syncRaw: true }] },

      { id: "headline", label: "Headline", type: "text", example: "Book your booth. Own the spotlight.",
        apply: [{ selector: "#d220", op: "html", build: (l) => `<h1 style="line-height: 1; mso-line-height-alt: 100%; text-align: center;" class="last-child"><span style="font-size: 30px"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(l[0])}</span></span></h1>` } ] },

      { id: "offer-paras", label: "Offer paragraphs", type: "textarea", hint: "One line per paragraph. Stats, cost, urgency.", example: "For two days at PBExpo 2027, the jumbotron will put your brand in front of thousands of attendees. 75 plays. 25 minutes of total screen time. 7,000+ projected attendees.\nAnd for today only, you can get that exposure at no additional cost when you purchase a qualifying booth package or bundle.\nIf you're considering exhibiting, today is the day to make your move.",
        apply: [{ selector: "#d239", op: "html", build: (l) => l.map(p => `<p style="text-align: left;"><span style="color:rgb(0, 0, 0);"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(p)}</span></span></p>`).join("") } ] },

      { id: "tier1-link", label: "Tier 1 — link URL", type: "url", hint: "Used last time: Platinum.", apply: [{ selector: 'a[data-block-id="312"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "tier1-img", label: "Tier 1 — image URL", type: "url", apply: [{ selector: 'a[data-block-id="312"] img', op: "attr", attr: "src", syncRaw: true }] },
      { id: "tier2-link", label: "Tier 2 — link URL", type: "url", hint: "Used last time: Silver.", apply: [{ selector: 'a[data-block-id="327"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "tier2-img", label: "Tier 2 — image URL", type: "url", apply: [{ selector: 'a[data-block-id="327"] img', op: "attr", attr: "src", syncRaw: true }] },
      { id: "tier3-link", label: "Tier 3 — link URL", type: "url", hint: "Used last time: 10×20 bundle.", apply: [{ selector: 'a[data-block-id="331"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "tier3-img", label: "Tier 3 — image URL", type: "url", apply: [{ selector: 'a[data-block-id="331"] img', op: "attr", attr: "src", syncRaw: true }] },
      { id: "tier4-link", label: "Tier 4 — link URL", type: "url", hint: "Used last time: Gold.", apply: [{ selector: 'a[data-block-id="320"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "tier4-img", label: "Tier 4 — image URL", type: "url", apply: [{ selector: 'a[data-block-id="320"] img', op: "attr", attr: "src", syncRaw: true }] },
      { id: "tier5-link", label: "Tier 5 — link URL", type: "url", hint: "Used last time: Bronze.", apply: [{ selector: 'a[data-block-id="328"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "tier5-img", label: "Tier 5 — image URL", type: "url", apply: [{ selector: 'a[data-block-id="328"] img', op: "attr", attr: "src", syncRaw: true }] },
      { id: "tier6-link", label: "Tier 6 — link URL", type: "url", hint: "Used last time: 10×10 bundle.", apply: [{ selector: 'a[data-block-id="333"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "tier6-img", label: "Tier 6 — image URL", type: "url", apply: [{ selector: 'a[data-block-id="333"] img', op: "attr", attr: "src", syncRaw: true }] },

      { id: "reg-headline", label: "Registration headline", type: "text", example: "Registration is Now Open",
        apply: [{ selector: "#d339", op: "html", build: (l) => `<p class="last-child" style="text-align: center; line-height: 115%;"><strong><span style="color:rgb(0, 100, 232);"><span style="font-size: 26px"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(l[0])}</span></span></span></strong></p>` } ] },

      { id: "reg-pitch", label: "Registration pitch", type: "textarea", example: "Registration for PBExpo 2027 is officially open to attendees, students, airlines, and operators. Secure your free spot and your drink ticket to the Networking Reception.",
        apply: [{ selector: "#d255", op: "html", build: (l) => l.map(p => `<p style="text-align: left;"><span style="color:rgb(0, 0, 0);"><span style="font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">${esc(p)}</span></span></p>`).join("") } ] },

      { id: "register-link", label: "Register button — link URL", type: "url", apply: [{ selector: 'a[data-button-link-id="334"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "register-text", label: "Register button text", type: "text", example: "Register Now", apply: [{ selector: 'a[data-button-link-id="334"]', op: "text", syncRaw: true }] },
      { id: "register-caption", label: "Register button caption", type: "text", example: "Exhibitor registration is not open yet.", apply: [{ selector: "#tb-register-caption", op: "text" }] },

      { id: "fine-print", label: "Offer fine print", type: "textarea", example: "*Gift with purchase. A qualifying booth bundle or package is required to receive the jumbotron ad placement. Rotation length and number of plays are subject to change based on the total number of ads in rotation and content length.",
        apply: [{ selector: "#d230", op: "html", build: (l) => `<p style="line-height: 1; mso-line-height-alt: 100%; text-align: justify;" class="last-child"><span style="color:rgb(0, 0, 0);"><span style="font-size: 12px">${esc(l.join(" "))}</span></span></p>` } ] },

      { id: "sponsor-credit", label: "Sponsor credit (optional — leave blank if none)", type: "text", example: "Registration is sponsored by Belmont Bank & Trust.",
        apply: [{ selector: "#d306", op: "html", build: (l) => l[0] ? `<p style="line-height: 1; mso-line-height-alt: 100%; text-align: justify;" class="last-child"><span style="color:rgb(0, 0, 0);"><span style="font-size: 12px">${esc(l[0])}</span></span></p>` : "" } ] },
    ],
  },

  {
    id: "networking",
    name: "Networking / Attendee Promo",
    master: "resources/template-builder/masters/networking.html",
    outputName: "networking-attendee-promo.html",
    use: "Attendee-facing value pitch — makes the case for registering by leaning on the in-person, face-to-face angle rather than an offer or discount.",
    fields: [
      { id: "header-img", label: "Top header banner — image URL", type: "url", hint: "628px wide, not clickable.", apply: [{ selector: "#tb-header-img", op: "attr", attr: "src", syncRaw: true }] },
      { id: "hero-link", label: "Hero CTA banner — link URL", type: "url", hint: "Also applied to the Register button below, since they share a destination.",
        apply: [{ selector: 'a[data-block-id="242"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "hero-img", label: "Hero CTA banner — image URL", type: "url", hint: "660px wide.", apply: [{ selector: 'a[data-block-id="242"] img', op: "attr", attr: "src", syncRaw: true }] },

      { id: "headline", label: "Headline", type: "text", example: "Face-to-Face Matters at PBExpo 2026",
        apply: [{ selector: "#d243", op: "html", build: (l) => `<p class="last-child" style="text-align: center;"><strong><span style="color:#0074ff;"><span style="font-size: 30px">${esc(l[0])}</span></span></strong></p>` } ] },

      { id: "value-paras", label: "Value-prop paragraphs", type: "textarea", hint: "One line per paragraph.", example: "In an industry built on trust and technical expertise, face-to-face conversations still drive the strongest outcomes. PBExpo 2026 brings the aviation and aerospace community together to support real discussions, faster decisions, and more meaningful connections that lead to ROI.\nPBExpo 2026 will welcome more than 8,000 aviation professionals and 150+ airlines from around the world. Once you register, you gain immediate access to the PBExpo App, where you can explore the floor plan, stay up to date, and schedule 1-to-1 meetings in advance.\nIf building strong connections and driving business forward are priorities this year, PBExpo 2026 is where those conversations happen.",
        apply: [{ selector: "#d220", op: "html", build: (l) => l.map((p, i) => `<p style="text-align: justify;"${i === l.length - 1 ? ' class="last-child"' : ""}><span style="color:#000000;">${esc(p)}</span></p>`).join("") } ] },

      { id: "register-text", label: "Register button text", type: "text", example: "Register to Attend", apply: [{ selector: "#tb-register-btn-text", op: "text" }] },

      { id: "video-link", label: "Video — YouTube URL", type: "url", apply: [{ selector: 'a[data-block-id="252"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "video-img", label: "Video thumbnail — image URL", type: "url", hint: "660px wide.", apply: [{ selector: 'a[data-block-id="252"] img', op: "attr", attr: "src", syncRaw: true }] },
    ],
  },

  {
    id: "amelia",
    name: "Amelia AI Announcement",
    master: "resources/template-builder/masters/amelia.html",
    outputName: "amelia-ai-announcement.html",
    use: "Coming-soon product tease — introduces a not-yet-launched feature (Amelia AI search), explains the value, and sends traffic back to the core product rather than a signup form.",
    fields: [
      { id: "logo-link", label: "Nav logo — link URL", type: "url", apply: [{ selector: 'a[data-block-id="3"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "logo-img", label: "Nav logo — image URL", type: "url", hint: "~245px wide.", apply: [{ selector: 'a[data-block-id="3"] img', op: "attr", attr: "src", syncRaw: true }] },
      { id: "hero-link", label: "Full-width hero banner — link URL", type: "url", apply: [{ selector: 'a[data-block-id="4"]', op: "attr", attr: "href", syncRaw: true }] },
      { id: "hero-img", label: "Full-width hero banner — image URL", type: "url", hint: "612px wide.", apply: [{ selector: 'a[data-block-id="4"] img', op: "attr", attr: "src", syncRaw: true }] },

      { id: "headline", label: "Headline", type: "text", example: "Coming Soon in 2026!",
        apply: [{ selector: "#d6", op: "html", build: (l) => `<p style="line-height: 2; mso-line-height-alt: 200%; text-align: center;" class="last-child"><strong><span style="color:rgb(0, 127, 233);"><span style="font-size: 26px">${esc(l[0])}</span></span></strong></p>` } ] },

      { id: "intro", label: "Intro paragraph(s)", type: "textarea", hint: "One line per paragraph.", example: "Introducing Amelia AI – the aviation industry's first AI-powered search assistant, coming to PartsBase in early 2026.\nSearch by simply describing what you need. Amelia AI handles the rest.",
        apply: [{ selector: "#d34", op: "html", build: (l) => l.map((p, i) => `<p class="mcePastedContent${i === l.length - 1 ? " last-child" : ""}">${esc(p)}</p>`).join("") } ] },

      { id: "spotlight", label: "Feature spotlight — left column", type: "textarea", hint: "Line 1: sub-headline. Line 2: body. Line 3: example query.", example: "Search parts the way you think. Get results faster.\nKnow your part number? Perfect – search it directly like you always have. But when you need more specificity or want to search conversationally, Amelia is ready to help:\n“Show me 971808MODA – a hydraulic pump – available in the United States.”",
        apply: [{ selector: "#d53", op: "html", build: (l) => `<p class="mcePastedContent"><strong><span style="color:#007fe9;"><span style="font-size: 22px">${esc(l[0] || "")}</span></span></strong></p><p class="mcePastedContent">${esc(l[1] || "")}</p><p class="mcePastedContent last-child"><em>${esc(l[2] || "")}</em></p>` } ] },
      { id: "spotlight-img", label: "Feature spotlight — right column image URL", type: "url", hint: "298px wide.", apply: [{ selector: 'img[data-block-id="56"]', op: "attr", attr: "src", syncRaw: true }] },

      { id: "benefits-headline", label: "Benefits headline", type: "text", example: "Why Amelia AI Matters for Your Business",
        apply: [{ selector: "#d51", op: "html", build: (l) => `<p style="text-align: center;" class="last-child"><strong><span style="color:rgb(0, 127, 233);"><span style="font-size: 24px">${esc(l[0])}</span></span></strong></p>` } ] },
      { id: "benefits-para", label: "Benefits paragraph(s)", type: "textarea", example: "Amelia understands natural language and instantly applies the right filters – even leveraging advanced features like our Industry Class Filters for government certifications, distributor types, and more.\nSkip the navigation. Just describe what you need, and Amelia delivers precise results instantly.\nThis isn't just a new feature. It's the future of parts procurement.",
        apply: [{ selector: "#d47", op: "html", build: (l) => l.map((p, i) => `<p class="mcePastedContent${i === l.length - 1 ? " last-child" : ""}">${esc(p)}</p>`).join("") } ] },

      { id: "closing-headline", label: "Closing headline", type: "text", example: "Stay Tuned for Amelia’s Release!",
        apply: [{ selector: "#d60", op: "html", build: (l) => `<p style="text-align: center;" class="last-child"><strong><span style="color:rgb(0, 127, 233);"><span style="font-size: 24px">${esc(l[0])}</span></span></strong></p>` } ] },
      { id: "closing-para", label: "Closing paragraph(s)", type: "textarea", example: "Amelia is part of our ongoing commitment to innovation for the Aviation and Aerospace industry, helping you source parts faster and more efficiently. Stay tuned for Amelia’s release!\nThank you for choosing PartsBase.",
        apply: [{ selector: "#d49", op: "html", build: (l) => l.map((p, i) => `<p class="mcePastedContent${i === l.length - 1 ? " last-child" : ""}">${esc(p)}</p>`).join("") } ] },

      { id: "btn-text", label: "Button text", type: "text", example: "Shop For Parts", apply: [{ selector: 'a[data-button-link-id="7"]', op: "text", syncRaw: true }] },
      { id: "btn-link", label: "Button link URL", type: "url", apply: [{ selector: 'a[data-button-link-id="7"]', op: "attr", attr: "href", syncRaw: true }] },
    ],
  },

  {
    id: "sales-outreach",
    name: "PartStore Sales Outreach",
    master: "resources/template-builder/masters/sales-outreach.html",
    outputName: "partstore-sales-outreach.html",
    use: "1:1 sales email — a rep sends this individually to one prospect introducing PartStore and asking for a call. Not a bulk campaign send.",
    fields: [
      { id: "greeting", label: "Greeting line", type: "text", hint: "The whole line, including the prospect's name.", example: "Hi Sarah,",
        apply: [{ selector: "#tb-greeting", op: "text" }] },

      { id: "pitch", label: "Pitch paragraph(s)", type: "textarea", hint: "One line per paragraph. Keep the closing line asking for a call.", example: "We've launched a modernized aviation commerce platform, PartStore, designed for fast and reliable instant purchasing. It's free to list your parts, we don't make a dollar until you do.\nIf you're looking to buy aviation parts, PartStore allows you to shop real time inventory and have a modern instant checkout experience. Without waiting on RFQ's.\nAre you free this week to jump on a call and discuss more?",
        apply: [{ selector: "#tb-pitch", op: "html", build: (l) => l.map((p, i) => `<p class="mcePastedContent${i === l.length - 1 ? " last-child" : ""}">${esc(p)}</p>`).join("") } ] },

      { id: "product-img", label: "Product image URL", type: "url", hint: "612px wide.", apply: [{ selector: 'img[data-block-id="71"]', op: "attr", attr: "src", syncRaw: true }] },

      { id: "signoff-name", label: "Your name (sign-off)", type: "text", hint: "Appears under “Kind Regards,”", example: "Kevin Thomas",
        apply: [{ selector: "#tb-signoff-name", op: "html", build: (l) => l[0] ? esc(l[0]) : "<br/>" } ] },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { TEMPLATES, esc };
