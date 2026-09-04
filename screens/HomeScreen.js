// screens/HomeScreen.js

import React, { useRef, useState } from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  StatusBar,
  Linking,
  Modal,
  ScrollView,
} from 'react-native';

import * as Location from 'expo-location';

import {
  colors,
  spacing,
  radius,
  type,
  typeUrdu,
} from '../theme';

import {
  PAKISTAN_EMERGENCY_NUMBERS,
} from '../utils/emergencyNumbers';

import {
  getTranslation,
} from '../utils/translations';

const HOLD_DURATION_MS = 900;

export default function HomeScreen({
  navigation,
}) {
  const [holding, setHolding] =
    useState(false);

  const [language, setLanguage] =
    useState('en');

  const [contactsVisible, setContactsVisible] =
    useState(false);

  const progress =
    useRef(new Animated.Value(0)).current;

  const holdTimeout =
    useRef(null);

  const t = getTranslation(language);

  const isUrdu = language === 'ur';

  const startHold = () => {
    setHolding(true);

    Animated.timing(progress, {
      toValue: 1,
      duration: HOLD_DURATION_MS,
      useNativeDriver: false,
    }).start();

    holdTimeout.current = setTimeout(
      async () => {
        try {
          const { status } =
            await Location.requestForegroundPermissionsAsync();

          if (status !== 'granted') {
            navigation.navigate(
              'Assessment',
              {
                locationDenied: true,
                language,
              }
            );

            return;
          }

          const position =
            await Location.getCurrentPositionAsync(
              {}
            );

          navigation.navigate(
            'Assessment',
            {
              latitude:
                position.coords.latitude,

              longitude:
                position.coords.longitude,

              language,
            }
          );
        } catch (error) {
          console.error(
            'Location error:',
            error
          );

          navigation.navigate(
            'Assessment',
            {
              locationDenied: true,
              language,
            }
          );
        }
      },
      HOLD_DURATION_MS
    );
  };

  const cancelHold = () => {
    setHolding(false);

    clearTimeout(
      holdTimeout.current
    );

    Animated.timing(progress, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const switchLanguage = () => {
    setLanguage((current) =>
      current === 'en'
        ? 'ur'
        : 'en'
    );
  };

  const widthInterpolate =
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

  const callNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const renderContact = (contact) => {
    const name =
      isUrdu && contact.nameUr
        ? contact.nameUr
        : contact.name;

    const operator =
      isUrdu && contact.operatorUr
        ? contact.operatorUr
        : contact.operator;

    const note =
      isUrdu && contact.noteUr
        ? contact.noteUr
        : contact.note;

    return (
      <Pressable
        key={contact.key}
        style={[
          styles.contactCard,
          isUrdu &&
            styles.contactCardUrdu,
        ]}
        onPress={() =>
          callNumber(contact.number)
        }
      >
        <Text style={styles.contactIcon}>
          {contact.icon}
        </Text>

        <View style={styles.contactInfo}>
          <Text
            style={[
              type.bodyMedium,
              styles.contactName,

              isUrdu &&
                typeUrdu.bodyMedium,

              isUrdu &&
                styles.rtl,
            ]}
          >
            {name}
          </Text>

          <Text
            style={[
              type.bodySm,
              styles.contactOperator,

              isUrdu &&
                typeUrdu.bodySm,

              isUrdu &&
                styles.rtl,
            ]}
          >
            {operator}
          </Text>

          {note && (
            <Text
              style={[
                type.bodySm,
                styles.contactNote,

                isUrdu &&
                  typeUrdu.bodySm,

                isUrdu &&
                  styles.rtl,
              ]}
            >
              {note}
            </Text>
          )}
        </View>

        <Text style={styles.contactNumber}>
          {contact.number}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.ink}
      />

      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.wordmark}>
            resQ
          </Text>

          <Pressable
            style={styles.languageButton}
            onPress={switchLanguage}
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

        <Text
          style={[
            type.body,
            styles.tagline,

            isUrdu &&
              typeUrdu.body,

            isUrdu &&
              styles.rtl,
          ]}
        >
          {t.tagline}
        </Text>
      </View>

      {/* EMERGENCY BUTTON */}

      <View style={styles.emergencyZone}>
        <Pressable
          onPressIn={startHold}
          onPressOut={cancelHold}
          style={({ pressed }) => [
            styles.emergencyButton,

            pressed &&
              styles.emergencyButtonPressed,
          ]}
        >
          <View
            style={styles.progressTrack}
          >
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width:
                    widthInterpolate,
                },
              ]}
            />
          </View>

          <Text
            style={[
              type.displayMd,
              styles.emergencyLabel,

              isUrdu &&
                typeUrdu.displayMd,

              isUrdu &&
                styles.rtl,
            ]}
          >
            {t.emergency}
          </Text>

          <Text
            style={[
              type.bodySm,
              styles.emergencyHint,

              isUrdu &&
                typeUrdu.bodySm,

              isUrdu &&
                styles.rtl,
            ]}
          >
            {holding
              ? t.holdStill
              : t.pressAndHold}
          </Text>
        </Pressable>
      </View>

      {/* FOOTER */}

      <View style={styles.footer}>
        <Pressable
          style={styles.secondaryAction}
          onPress={() =>
            setContactsVisible(true)
          }
        >
          <View
            style={styles.secondaryDot}
          />

          <Text
            style={[
              type.bodyMedium,
              styles.secondaryText,

              isUrdu &&
                typeUrdu.bodyMedium,

              isUrdu &&
                styles.rtl,
            ]}
          >
            {t.emergencyContacts}
          </Text>
        </Pressable>

        <Text
          style={[
            type.bodySm,
            styles.disclaimer,

            isUrdu &&
              typeUrdu.bodySm,

            isUrdu &&
              styles.rtl,
          ]}
        >
          {t.disclaimer}
        </Text>
      </View>

      {/* CONTACT MODAL */}

      <Modal
        visible={contactsVisible}
        animationType="slide"
        transparent
        onRequestClose={() =>
          setContactsVisible(false)
        }
      >
        <View
          style={styles.modalOverlay}
        >
          <View
            style={[
              styles.modalContainer,

              isUrdu &&
                styles.modalContainerUrdu,
            ]}
          >
            <View
              style={styles.modalHeader}
            >
              <Text
                style={[
                  type.displaySm,
                  styles.modalTitle,

                  isUrdu &&
                    typeUrdu.displaySm,

                  isUrdu &&
                    styles.rtl,
                ]}
              >
                {t.emergencyContacts}
              </Text>

              <Pressable
                onPress={() =>
                  setContactsVisible(
                    false
                  )
                }
              >
                <Text
                  style={
                    styles.closeButton
                  }
                >
                  ×
                </Text>
              </Pressable>
            </View>

            <Text
              style={[
                type.bodySm,
                styles.modalSubtitle,

                isUrdu &&
                  typeUrdu.bodySm,

                isUrdu &&
                  styles.rtl,
              ]}
            >
              {t.tapToCall}
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={
                false
              }
            >
              <Text
                style={[
                  type.label,
                  styles.sectionTitle,

                  isUrdu &&
                    typeUrdu.label,

                  isUrdu &&
                    styles.rtl,
                ]}
              >
                {t.emergencyServices}
              </Text>

              {PAKISTAN_EMERGENCY_NUMBERS.primary.map(
                renderContact
              )}

              <Text
                style={[
                  type.label,
                  styles.sectionTitle,

                  isUrdu &&
                    typeUrdu.label,

                  isUrdu &&
                    styles.rtl,
                ]}
              >
                {t.additionalHelp}
              </Text>

              {PAKISTAN_EMERGENCY_NUMBERS.additional.map(
                renderContact
              )}

              <Text
                style={[
                  type.bodySm,
                  styles.modalDisclaimer,

                  isUrdu &&
                    typeUrdu.bodySm,

                  isUrdu &&
                    styles.rtl,
                ]}
              >
                {t.contactDisclaimer}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },

  rtl: {
    writingDirection: 'rtl',
    textAlign: 'right',
  },

  header: {
    paddingTop: spacing.xxl,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  wordmark: {
    ...type.displayLg,
    color: colors.paper,
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

  tagline: {
    color: colors.slate,
    marginTop: spacing.xs,
    maxWidth: 280,
  },

  emergencyZone: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  emergencyButton: {
    width: 220,
    height: 220,
    borderRadius: 110,

    backgroundColor:
      colors.signalDim,

    borderWidth: 2,
    borderColor: colors.signal,

    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',
  },

  emergencyButtonPressed: {
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },

  progressFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,

    height: '100%',

    backgroundColor:
      colors.signal,

    opacity: 0.35,
  },

  emergencyLabel: {
    color: colors.paper,
    textAlign: 'center',
  },

  emergencyHint: {
    color: colors.slate,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  footer: {
    paddingBottom: spacing.xl,
  },

  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: radius.md,

    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },

  secondaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,

    backgroundColor:
      colors.signal,

    marginRight: spacing.sm,
  },

  secondaryText: {
    color: colors.paper,
    flex: 1,
  },

  disclaimer: {
    color: colors.slate,
    textAlign: 'center',
    marginTop: spacing.md,
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.65)',

    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: colors.ink,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    padding: spacing.lg,

    maxHeight: '90%',
  },

  modalContainerUrdu: {
    paddingBottom: spacing.xxl,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalTitle: {
    color: colors.paper,
    flex: 1,
  },

  closeButton: {
    color: colors.paper,
    fontSize: 32,
    lineHeight: 34,
    paddingLeft: 15,
  },

  modalSubtitle: {
    color: colors.slate,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    color: colors.slate,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },

  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: radius.md,

    padding: spacing.md,
    marginBottom: spacing.sm,
  },

  contactCardUrdu: {
    flexDirection: 'row-reverse',
  },

  contactIcon: {
    fontSize: 25,
    width: 38,
    textAlign: 'center',
  },

  contactInfo: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },

  contactName: {
    color: colors.paper,
  },

  contactOperator: {
    color: colors.slate,
    marginTop: 2,
  },

  contactNote: {
    color: colors.amber,
    marginTop: 3,
  },

  contactNumber: {
    ...type.bodyMedium,
    color: colors.signal,
    fontSize: 17,
  },

  modalDisclaimer: {
    color: colors.slate,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
});