// utils/emergencyNumbers.js

export const PAKISTAN_EMERGENCY_NUMBERS = {
  primary: [
    {
      key: 'rescue1122',

      name: 'Rescue 1122',
      nameUr: 'ریسکیو 1122',

      operator:
        'Government emergency service — ambulance, fire & rescue',

      operatorUr:
        'سرکاری ایمرجنسی سروس — ایمبولینس، فائر اور ریسکیو',

      number: '1122',

      icon: '🚑',

      note:
        'Covers Punjab, KP, Balochistan, Sindh, GB & AJK',

      noteUr:
        'پنجاب، خیبر پختونخوا، بلوچستان، سندھ، گلگت بلتستان اور آزاد کشمیر میں دستیاب',
    },

    {
      key: 'police',

      name: 'Police Emergency',
      nameUr: 'پولیس ایمرجنسی',

      operator: 'Pakistan Police',
      operatorUr: 'پاکستان پولیس',

      number: '15',

      icon: '🚓',
    },

    {
      key: 'edhi',

      name: 'Edhi Foundation Ambulance',
      nameUr: 'ایدھی فاؤنڈیشن ایمبولینس',

      operator:
        "Pakistan's largest free ambulance network",

      operatorUr:
        'پاکستان کا بڑا مفت ایمبولینس نیٹ ورک',

      number: '115',

      icon: '🚑',
    },

    {
      key: 'fire',

      name: 'Fire Brigade',
      nameUr: 'فائر بریگیڈ',

      operator: 'National Fire Service',
      operatorUr: 'فائر ایمرجنسی سروس',

      number: '16',

      icon: '🚒',
    },
  ],

  additional: [
    {
      key: 'chhipa',

      name: 'Chhipa Ambulance Service',
      nameUr: 'چھیپا ایمبولینس سروس',

      operator:
        'Chhipa Welfare Association',

      operatorUr:
        'چھیپا ویلفیئر ایسوسی ایشن',

      number: '1020',

      icon: '🚑',

      note:
        'Strongest coverage in Sindh / Karachi',

      noteUr:
        'سندھ اور کراچی میں نمایاں سروس',
    },

    {
      key: 'women_child',

      name: 'Women & Child Helpline',
      nameUr: 'خواتین اور بچوں کی ہیلپ لائن',

      operator:
        'Ministry of Human Rights',

      operatorUr:
        'وزارت انسانی حقوق',

      number: '1099',

      icon: '🛡️',
    },

    {
      key: 'motorway',

      name: 'Motorway Police',
      nameUr: 'موٹروے پولیس',

      operator:
        'National Highways & Motorway Police',

      operatorUr:
        'نیشنل ہائی ویز اینڈ موٹروے پولیس',

      number: '130',

      icon: '🛣️',
    },

    {
      key: 'armed_forces',

      name: 'Armed Forces Emergency Helpline',
      nameUr: 'مسلح افواج ایمرجنسی ہیلپ لائن',

      operator:
        'Terrorism-related emergencies',

      operatorUr:
        'دہشت گردی سے متعلقہ ہنگامی صورتحال',

      number: '1135',

      icon: '📞',
    },
  ],
};

export const PRIMARY_CALL_NUMBER =
  PAKISTAN_EMERGENCY_NUMBERS.primary[0];