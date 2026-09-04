// screens/HospitalMapScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors, spacing, radius, type } from '../theme';
// Wraps your Places API (nearby search) + Routes API (distance/ETA) calls
import { findNearbyHospitals } from '../api/findNearbyHospitals';

export default function HospitalMapScreen({ route }) {
  const { latitude, longitude } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const results = await findNearbyHospitals(latitude, longitude);
      if (active) {
        setHospitals(results);
        setSelected(results[0] || null);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [latitude, longitude]);

  const navigateTo = (hospital) => {
    const url =
      Platform.OS === 'ios'
        ? `maps://app?daddr=${hospital.latitude},${hospital.longitude}`
        : `google.navigation:q=${hospital.latitude},${hospital.longitude}`;
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.trust} size="large" />
        <Text style={styles.loadingText}>Finding nearby hospitals…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        userInterfaceStyle="dark"
      >
        <Marker coordinate={{ latitude, longitude }} pinColor={colors.signal} title="You" />
        {hospitals.map((h) => (
          <Marker
            key={h.id}
            coordinate={{ latitude: h.latitude, longitude: h.longitude }}
            pinColor={colors.trust}
            title={h.name}
            onPress={() => setSelected(h)}
          />
        ))}
      </MapView>

      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>Nearest hospitals</Text>
        <FlatList
          data={hospitals}
          keyExtractor={(item) => item.id}
          horizontal={false}
          contentContainerStyle={{ paddingBottom: spacing.md }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelected(item)}
              style={[
                styles.hospitalCard,
                selected?.id === item.id && styles.hospitalCardActive,
              ]}
            >
              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>{item.name}</Text>
                <Text style={styles.hospitalMeta}>
                  {item.distanceKm} km · {item.etaMinutes} min
                </Text>
              </View>
              <Pressable style={styles.navigateButton} onPress={() => navigateTo(item)}>
                <Text style={styles.navigateText}>Navigate</Text>
              </Pressable>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  map: { flex: 1 },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: { ...type.body, color: colors.slate, marginTop: spacing.md },
  sheet: {
    backgroundColor: colors.inkElevated,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    maxHeight: '45%',
  },
  sheetTitle: { ...type.displaySm, color: colors.paper, marginBottom: spacing.sm },
  hospitalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  hospitalCardActive: {
    borderColor: colors.trust,
  },
  hospitalInfo: { flex: 1, marginRight: spacing.sm },
  hospitalName: { ...type.bodyMedium, color: colors.paper },
  hospitalMeta: { ...type.bodySm, color: colors.slate, marginTop: 2 },
  navigateButton: {
    backgroundColor: colors.trust,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  navigateText: { ...type.label, color: colors.ink },
});