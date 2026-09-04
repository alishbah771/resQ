// utils/translations.js

export const translations = {
  en: {
    tagline: 'Help, in the first minutes that matter.',

    emergency: 'Emergency',
    pressAndHold: 'Press and hold',
    holdStill: 'Hold still…',

    emergencyContacts: 'Emergency contacts',
    tapToCall: 'Tap a service to call.',
    emergencyServices: 'Emergency services',
    additionalHelp: 'Additional help',
    call: 'Call',

    disclaimer:
      'resQ gives guidance, not medical care.',

    contactDisclaimer:
      'resQ does not automatically place emergency calls. You choose when to call.',

    whatsHappening: "What's happening?",

    assessmentSubtitle:
      'Describe it in a few words. resQ will tell you what to do next.',

    locationWarning:
      "Location access is off — hospital routing won't work until it's enabled.",

    inputPlaceholder:
      "e.g. My friend fell and isn't responding",

    getGuidance: 'Get guidance',

    firstAidSteps: 'First-aid steps',

    callEmergency: 'Call emergency services',

    findHospital: 'Find nearest hospital',

    unableToAssess:
      "Couldn't reach the assessment service — here's general guidance.",

    stayCalm:
      'Stay calm and keep the area safe.',

    callIfUnsure:
      'Call emergency services if unsure.',

    language: 'اردو',
  },

  ur: {
    tagline:
      'ان اہم ابتدائی لمحات میں مدد حاصل کریں۔',

    emergency: 'ایمرجنسی',

    pressAndHold:
      'دبا کر رکھیں',

    holdStill:
      'دبائے رکھیں…',

    emergencyContacts:
      'ایمرجنسی رابطے',

    tapToCall:
      'کال کرنے کے لیے سروس منتخب کریں۔',

    emergencyServices:
      'ایمرجنسی سروسز',

    additionalHelp:
      'مزید مدد',

    call:
      'کال',

    disclaimer:
      'resQ رہنمائی فراہم کرتا ہے، طبی علاج نہیں۔',

    contactDisclaimer:
      'resQ خودکار طور پر ایمرجنسی کال نہیں کرتا۔ کال کرنے کا فیصلہ آپ خود کرتے ہیں۔',

    whatsHappening:
      'کیا ہو رہا ہے؟',

    assessmentSubtitle:
      'چند الفاظ میں صورتحال بیان کریں۔ resQ آپ کو اگلا قدم بتائے گا۔',

    locationWarning:
      'لوکیشن کی اجازت بند ہے — ہسپتال کی رہنمائی کے لیے لوکیشن فعال کریں۔',

    inputPlaceholder:
      'مثلاً: میرا دوست گر گیا ہے اور جواب نہیں دے رہا',

    getGuidance:
      'رہنمائی حاصل کریں',

    firstAidSteps:
      'ابتدائی طبی امداد کے اقدامات',

    callEmergency:
      'ایمرجنسی کو کال کریں',

    findHospital:
      'قریب ترین ہسپتال تلاش کریں',

    unableToAssess:
      'تشخیصی سروس سے رابطہ نہیں ہو سکا — یہاں عمومی رہنمائی دی جا رہی ہے۔',

    stayCalm:
      'پرسکون رہیں اور اردگرد کی جگہ کو محفوظ رکھیں۔',

    callIfUnsure:
      'اگر صورتحال کے بارے میں یقین نہ ہو تو ایمرجنسی سروسز کو کال کریں۔',

    language:
      'English',
  },
};

export const getTranslation = (language) => {
  return translations[language] || translations.en;
};