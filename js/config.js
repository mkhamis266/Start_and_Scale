/**
 * ============================================================================
 * SITE CONFIG — edit these values, nothing else, to update the whole page.
 * See start-and-scale-landing-page-plan.md §1 (open questions) for context on
 * why each of these is a placeholder rather than a hardcoded value.
 * ============================================================================
 */
window.SITE_CONFIG = {
  // §1.1 — WhatsApp button number. NOT the InstaPay number (01152838249).
  // Confirm with Mahmoud/Sherouk which of the two candidate numbers to use:
  //   011 07351322  (Page's public "Mobile/WhatsApp" contact)
  //   +201092144133 (number wired into the Page's WhatsApp button)
  // Format: country code + number, no leading 0, no spaces (e.g. "201234567890").
  WHATSAPP_NUMBER: "20XXXXXXXXXX",

  // §1.1 — the InstaPay number is confirmed and should NOT be changed here.
  INSTAPAY_NUMBER: "01152838249",

  // §1.2 — urgency / deadline microcopy shown in the hero and pricing section.
  // The sourced deadline ("حتى 30 أغسطس") has already passed. Replace with a
  // real deadline for the next round before publishing.
  URGENCY_LINE: "سعر خاص للراوند الحالية — الأماكن محدودة",

  // §1.5 — instructor bio. Confirm current title/employer with Sherouk first.
  INSTRUCTOR_BIO: "بيانات السيرة الذاتية والخبرات قيد التأكيد مع Sherouk — هيتم تحديثها قبل النشر.",
  INSTRUCTOR_ROLE_PLACEHOLDER: "مدرّبة ومتخصصة فى التسويق الرقمي", // review before publishing

  // §1.8 — production domain, used for canonical/OG URLs.
  DOMAIN: "example.com",

  // Prefilled WhatsApp message.
  WHATSAPP_MESSAGE: "عايز أعرف تفاصيل كورس Start and Scale",

  // Lead form (§4.14) submissions POST here as a Google Apps Script Web App
  // that appends a row to a Google Sheet. See site/GOOGLE_SHEET_SETUP.md for
  // the one-time setup steps to get this URL. Leave empty to keep the form
  // in local-only mode (shows success message, does not actually send data).
  LEAD_FORM_ENDPOINT: "",
};
