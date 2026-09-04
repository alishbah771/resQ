// screens/AssessmentScreen.js

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  colors,
  spacing,
  radius,
  type,
  typeUrdu,
} from '../theme';

import {
  assessSituation,
} from '../api/assessSituation';

import {
  PRIMARY_CALL_NUMBER,
} from '../utils/emergencyNumbers';

import {
  getTranslation,
} from '../utils/translations';

const SEVERITY_STYLES = {
  critical: {
    bg: colors.signalDim,
    border: colors.signal,

    label:
      'Life-threatening — call now',

    labelUr:
      'جان کو خطرہ — ابھی کال کریں',
  },

  urgent: {
    bg: colors.amberDim,
    border: colors.amber,

    label:
      'Urgent — act quickly',

    labelUr:
      'فوری توجہ ضروری ہے',
  },

  moderate: {
    bg: colors.trustDim,
    border: colors.trust,

    label:
      'Needs attention',

    labelUr:
      'توجہ کی ضرورت ہے',
  },
};

export default function AssessmentScreen({
  route,
  navigation,
}) {
  const {
    latitude,
    longitude,
    locationDenied,
    language: routeLanguage,
  } = route.params || {};

  const [language, setLanguage] =
    useState(
      routeLanguage || 'en'
    );

  const [input, setInput] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const t =
    getTranslation(language);

  const isUrdu =
    language === 'ur';

  const toggleLanguage = () => {
    setLanguage((current) =>
      current === 'en'
        ? 'ur'
        : 'en'
    );
  };

  const handleSubmit = async () => {
    if (!input.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response =
        await assessSituation(
          input.trim(),
          language
        );

      setResult(response);
    } catch (error) {
      console.error(
        'assessSituation failed:',
        error.message
      );

      setResult({
        severity: 'moderate',

        summary:
          t.unableToAssess,

        steps: [
          t.stayCalm,
          t.callIfUnsure,
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const severityStyle =
    result &&
    SEVERITY_STYLES[
      result.severity
    ]
      ? SEVERITY_STYLES[
          result.severity
        ]
      : SEVERITY_STYLES.moderate;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* LANGUAGE */}

        <View style={styles.topBar}>
          <View
            style={styles.topSpacer}
          />

          <Pressable
            style={
              styles.languageButton
            }
            onPress={
              toggleLanguage
            }
          >
            <Text
              style={[
                type.bodySm,
                styles.languageText,

                isUrdu &&
                  typeUrdu.bodySm,

                isUrdu &&
                  styles.rtl,
              ]}
            >
              {t.language}
            </Text>
          </Pressable>
        </View>

        {/* TITLE */}

        <Text
          style={[
            type.displayMd,
            styles.title,

            isUrdu &&
              typeUrdu.displayMd,

            isUrdu &&
              styles.rtl,
          ]}
        >
          {t.whatsHappening}
        </Text>

        <Text
          style={[
            type.body,
            styles.subtitle,

            isUrdu &&
              typeUrdu.body,

            isUrdu &&
              styles.rtl,
          ]}
        >
          {t.assessmentSubtitle}
        </Text>

        {/* LOCATION WARNING */}

        {locationDenied && (
          <View
            style={
              styles.warningBanner
            }
          >
            <Text
              style={[
                type.bodySm,
                styles.warningText,

                isUrdu &&
                  typeUrdu.bodySm,

                isUrdu &&
                  styles.rtl,
              ]}
            >
              {t.locationWarning}
            </Text>
          </View>
        )}

        {/* INPUT */}

        <TextInput
          style={[
            type.body,
            styles.input,

            isUrdu &&
              typeUrdu.body,

            isUrdu &&
              styles.rtl,
          ]}
          placeholder={
            t.inputPlaceholder
          }
          placeholderTextColor={
            colors.slate
          }
          value={input}
          onChangeText={setInput}
          multiline
          textAlignVertical="top"
          autoFocus
        />

        {/* SUBMIT */}

        <Pressable
          style={[
            styles.submitButton,

            !input.trim() &&
              styles.submitButtonDisabled,
          ]}
          onPress={
            handleSubmit
          }
          disabled={
            !input.trim() ||
            loading
          }
        >
          {loading ? (
            <ActivityIndicator
              color={colors.ink}
            />
          ) : (
            <Text
              style={[
                type.button,
                styles.submitText,

                isUrdu &&
                  typeUrdu.button,

                isUrdu &&
                  styles.rtl,
              ]}
            >
              {t.getGuidance}
            </Text>
          )}
        </Pressable>

        {/* RESULT */}

        {result && (
          <View
            style={
              styles.resultBlock
            }
          >
            {/* SEVERITY */}

            <View
              style={[
                styles.severityBadge,
                {
                  backgroundColor:
                    severityStyle.bg,

                  borderColor:
                    severityStyle.border,
                },
              ]}
            >
              <Text
                style={[
                  type.label,

                  {
                    color:
                      severityStyle.border,
                  },

                  isUrdu &&
                    typeUrdu.label,

                  isUrdu &&
                    styles.rtl,
                ]}
              >
                {isUrdu
                  ? severityStyle.labelUr
                  : severityStyle.label}
              </Text>
            </View>

            {/* SUMMARY */}

            <Text
              style={[
                type.body,
                styles.summary,

                isUrdu &&
                  typeUrdu.body,

                isUrdu &&
                  styles.rtl,
              ]}
            >
              {result.summary}
            </Text>

            {/* STEPS TITLE */}

            <Text
              style={[
                type.displaySm,
                styles.stepsHeading,

                isUrdu &&
                  typeUrdu.displaySm,

                isUrdu &&
                  styles.rtl,
              ]}
            >
              {t.firstAidSteps}
            </Text>

            {/* STEPS */}

            {result.steps.map(
              (step, index) => (
                <View
                  key={index}
                  style={[
                    styles.stepRow,

                    isUrdu &&
                      styles.stepRowUrdu,
                  ]}
                >
                  <View
                    style={
                      styles.stepNumber
                    }
                  >
                    <Text
                      style={[
                        type.label,
                        styles.stepNumberText,
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </View>

                  <Text
                    style={[
                      type.body,
                      styles.stepText,

                      isUrdu &&
                        typeUrdu.body,

                      isUrdu &&
                        styles.rtl,
                    ]}
                  >
                    {step}
                  </Text>
                </View>
              )
            )}

            {/* CALL */}

            <Pressable
              style={
                styles.callButton
              }
              onPress={() =>
                Linking.openURL(
                  `tel:${PRIMARY_CALL_NUMBER.number}`
                )
              }
            >
              <Text
                style={[
                  type.button,
                  styles.callButtonText,

                  isUrdu &&
                    typeUrdu.button,

                  isUrdu &&
                    styles.rtl,
                ]}
              >
                {t.callEmergency}
              </Text>
            </Pressable>

            {/* HOSPITAL */}

            <Pressable
              style={
                styles.hospitalButton
              }
              onPress={() =>
                navigation.navigate(
                  'HospitalMap',
                  {
                    latitude,
                    longitude,
                  }
                )
              }
            >
              <Text
                style={[
                  type.button,
                  styles.hospitalButtonText,

                  isUrdu &&
                    typeUrdu.button,

                  isUrdu &&
                    styles.rtl,
                ]}
              >
                {t.findHospital}
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,
  },

  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  rtl: {
    writingDirection: 'rtl',
    textAlign: 'right',
  },

  /* TOP BAR */

  topBar: {
    height: 42,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    marginBottom: spacing.sm,
  },

  topSpacer: {
    flex: 1,
  },

  languageButton: {
    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: radius.pill,

    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  languageText: {
    color: colors.paper,
  },

  /* TITLE */

  title: {
    color: colors.paper,
  },

  subtitle: {
    color: colors.slate,

    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },

  /* WARNING */

  warningBanner: {
    backgroundColor:
      colors.amberDim,

    borderWidth: 1,
    borderColor: colors.amber,

    borderRadius: radius.md,

    padding: spacing.md,

    marginBottom: spacing.md,
  },

  warningText: {
    color: colors.amber,
  },

  /* INPUT */

  input: {
    color: colors.paper,

    backgroundColor:
      colors.inkElevated,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: radius.md,

    padding: spacing.md,

    minHeight: 110,

    textAlignVertical: 'top',
  },

  /* BUTTON */

  submitButton: {
    backgroundColor:
      colors.paper,

    borderRadius: radius.md,

    paddingVertical:
      spacing.md,

    alignItems: 'center',

    marginTop: spacing.md,
  },

  submitButtonDisabled: {
    opacity: 0.4,
  },

  submitText: {
    color: colors.ink,
  },

  /* RESULT */

  resultBlock: {
    marginTop: spacing.xl,
  },

  severityBadge: {
    alignSelf: 'flex-start',

    borderWidth: 1,

    borderRadius:
      radius.pill,

    paddingHorizontal:
      spacing.md,

    paddingVertical:
      spacing.xs,
  },

  summary: {
    color: colors.paper,

    marginTop:
      spacing.md,
  },

  stepsHeading: {
    color: colors.paper,

    marginTop:
      spacing.lg,

    marginBottom:
      spacing.sm,
  },

  /* STEPS */

  stepRow: {
    flexDirection: 'row',

    marginBottom:
      spacing.sm,

    alignItems:
      'flex-start',
  },

  stepRowUrdu: {
    flexDirection:
      'row-reverse',
  },

  stepNumber: {
    width: 24,
    height: 24,

    borderRadius: 12,

    backgroundColor:
      colors.inkElevated,

    borderWidth: 1,
    borderColor: colors.border,

    alignItems: 'center',
    justifyContent:
      'center',

    marginRight:
      spacing.sm,

    marginTop: 3,
  },

  stepNumberText: {
    color: colors.paper,
  },

  stepText: {
    color: colors.paper,
    flex: 1,
  },

  /* CALL */

  callButton: {
    backgroundColor:
      colors.signal,

    borderRadius:
      radius.md,

    paddingVertical:
      spacing.md,

    alignItems: 'center',

    marginTop:
      spacing.xl,
  },

  callButtonText: {
    color: colors.paper,
  },

  /* HOSPITAL */

  hospitalButton: {
    borderWidth: 1,

    borderColor:
      colors.trust,

    borderRadius:
      radius.md,

    paddingVertical:
      spacing.md,

    alignItems: 'center',

    marginTop:
      spacing.sm,
  },

  hospitalButtonText: {
    color: colors.trust,
  },
});