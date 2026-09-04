// theme.js
// resQ — design tokens

export const colors = {
  // Base
  ink: '#10141A',
  inkElevated: '#171C24',
  border: '#262D38',
  paper: '#F5F6F8',
  slate: '#8A93A3',

  // Functional accents
  signal: '#E63946',
  signalDim: '#3A1B1F',

  trust: '#1FA2A6',
  trustDim: '#12303A',

  amber: '#F2A93B',
  amberDim: '#3A2E14',

  success: '#4CAF6D',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

/* =========================
   ENGLISH TYPOGRAPHY
========================= */

export const type = {
  displayLg: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 32,
    lineHeight: 38,
  },

  displayMd: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    lineHeight: 30,
  },

  displaySm: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 18,
    lineHeight: 24,
  },

  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 23,
  },

  bodyMedium: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    lineHeight: 23,
  },

  bodySm: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },

  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 18,
  },

  button: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    lineHeight: 22,
  },
};

/* =========================
   URDU TYPOGRAPHY
========================= */

export const typeUrdu = {
  displayLg: {
    fontFamily: 'NotoNaskhArabic_700Bold',
    fontSize: 26,
    lineHeight: 38,
  },

  displayMd: {
    fontFamily: 'NotoNaskhArabic_700Bold',
    fontSize: 23,
    lineHeight: 34,
  },

  displaySm: {
    fontFamily: 'NotoNaskhArabic_600SemiBold',
    fontSize: 20,
    lineHeight: 30,
  },

  body: {
    fontFamily: 'NotoNaskhArabic_400Regular',
    fontSize: 16,
    lineHeight: 27,
  },

  bodyMedium: {
    fontFamily: 'NotoNaskhArabic_600SemiBold',
    fontSize: 16,
    lineHeight: 27,
  },

  bodySm: {
    fontFamily: 'NotoNaskhArabic_400Regular',
    fontSize: 14,
    lineHeight: 24,
  },

  label: {
    fontFamily: 'NotoNaskhArabic_600SemiBold',
    fontSize: 13,
    lineHeight: 22,
  },

  button: {
    fontFamily: 'NotoNaskhArabic_600SemiBold',
    fontSize: 16,
    lineHeight: 25,
  },
};

/* =========================
   FONTS
========================= */

export const fontsToLoad = {
  // English

  SpaceGrotesk_700Bold: require(
    '@expo-google-fonts/space-grotesk/700Bold/SpaceGrotesk_700Bold.ttf'
  ),

  SpaceGrotesk_500Medium: require(
    '@expo-google-fonts/space-grotesk/500Medium/SpaceGrotesk_500Medium.ttf'
  ),

  Inter_400Regular: require(
    '@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf'
  ),

  Inter_500Medium: require(
    '@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf'
  ),

  Inter_600SemiBold: require(
    '@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf'
  ),

  // Urdu

  NotoNaskhArabic_400Regular: require(
    '@expo-google-fonts/noto-naskh-arabic/400Regular/NotoNaskhArabic_400Regular.ttf'
  ),

  NotoNaskhArabic_600SemiBold: require(
    '@expo-google-fonts/noto-naskh-arabic/600SemiBold/NotoNaskhArabic_600SemiBold.ttf'
  ),

  NotoNaskhArabic_700Bold: require(
    '@expo-google-fonts/noto-naskh-arabic/700Bold/NotoNaskhArabic_700Bold.ttf'
  ),
};