###### Summary of Your Deliverability

###### Biggest Finding & Priority Recommendation

Your account is experiencing extremely high permission complaints (over 25% of unsubscribers say they don't recognize your emails), which is well above the recommended threshold of 4%. This is the most urgent issue and could significantly impact your reputation and inbox placement. Your overall open rates are also below industry benchmarks, indicating engagement and inboxing challenges.

###### What We're Observing (Effects)

| Metric | Current Value (Recent Weeks) | Recommended Threshold | Severity |
| :---- | :---- | :---- | :---- |
| Permission Complaints | 17–30% (often \>25%) | \<4% | EXTREME CRITICAL |
| Open Rate | 10–21% (often \<20%) | \>28% | Moderate–Serious |
| Click Rate | 1–7% | \>1% | Good |
| Hard Bounce Rate | 0.02–0.18% | \<0.1% (high volume) | Good |
| Unsubscribe Rate | 0.07–0.22% | \<0.3% | Good |

* Permission complaints are consistently at EXTREME CRITICAL levels.  
* Open rates are mostly below 20%, which is below the recommended threshold and suggests inbox placement or engagement issues.  
* Click rates are healthy, indicating that those who do open are engaging.  
* Bounce and unsubscribe rates are within acceptable ranges.

###### What's Causing It (Root Causes)

* High permission complaints indicate many recipients do not recognize your emails. This is often due to:  
  * Sending to old or unengaged contacts  
  * Infrequent or inconsistent sending (though your cadence is mostly regular)  
  * Branding or sender name not matching what subscribers expect  
  * Lack of clear permission reminders in your emails  
* Segmentation: You are using segmentation (average 4–50% of your audience per send), but the high permission complaints suggest you may still be including too many unengaged or old contacts.  
* Authentication: All emails are sent with authentication, which is good.

###### Mailbox Provider Performance Breakdown

| Mailbox Provider | Open Rate (%) | Click Rate (%) | Hard Bounce (%) | Permission Complaints (%) |
| :---- | :---- | :---- | :---- | :---- |
| Microsoft Office365 | 34.4 | 8.6 | 0.07 | 27.3 |
| Proofpoint | 3.0 | 1.3 | 0.03 | 30.3 |
| Cisco Ironport | 37.9 | 0.7 | 0.01 | 32.6 |
| Google Workspace | 28.8 | 0.6 | 0.13 | 8.9 |
| Gmail | 12.5 | 0.1 | 0.02 | Sparse |
| Yahoo | 36.3 | 0.2 | Sparse | Sparse |
| Barracuda | 18.0 | 55.7\* | 0.01 | 24.9 |
| App River | 32.9 | 5.2 | 0.02 | 27.5 |

\*Click rates at some business providers (like Barracuda) are inflated by security scanning.

* Permission complaints are high across nearly all major mailbox providers.  
* Open rates are especially low at Gmail (12.5%) and Proofpoint (3.0%), suggesting inbox placement issues at those providers.

###### Prioritized Recommendations

* Address Permission Complaints Immediately  
  * Over 25% of your unsubscribers say they never signed up for your emails. This is well above the recommended threshold and could significantly damage your reputation.  
  * Review your branding and ensure your sender name and email content match what subscribers expect.  
  * Send only to recent, engaged contacts (opened/clicked in the last 30–60 days).  
  * Add a clear reminder in your emails about how/when subscribers opted in.  
  * Consider running a re-permission campaign for older contacts.  
  * More on this: [The Importance of Permission](https://mailchimp.com/help/the-importance-of-permission/), [Reputation Repair & Deliverability Issues](https://mailchimp.com/resources/reputation-repair-deliverability-issues/), [Find Out Why Someone Unsubscribed](https://mailchimp.com/help/find-out-why-someone-unsubscribed/)  
* Improve Segmentation  
  * Tighten your segmentation to focus on subscribers who have engaged recently.  
  * Avoid sending to contacts who have not opened or clicked in the last 90 days.  
  * Guidance: [Getting Started with Segments](https://mailchimp.com/help/getting-started-with-segments/)  
* Monitor Open Rates and Engagement  
  * Track open rates by mailbox provider to identify where inbox placement is weakest.  
  * If open rates at Apple are below 50%, this may indicate spam folder placement.

###### Suggested Follow-Up Questions

* Which mailbox providers have the highest permission complaint rates?  
* When did permission complaints start increasing?  
* What emails had the highest permission complaints or lowest open rates?  
* How does my sending frequency correlate with these complaints?

Let me know if you'd like a deeper dive into any of these areas or want to see trends for a specific mailbox provider or time period\!  
