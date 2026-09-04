// api/findNearbyHospitals.js
//
// Real integration: Places API (New) Nearby Search for hospitals,
// then Routes API for driving distance/ETA to each one.
// Returns: [{ id, name, latitude, longitude, distanceKm, etaMinutes }]
//
// SECURITY NOTE: same caveat as assessSituation.js — this key ships inside
// the client app. Fine for a hackathon demo; restrict the key to your app's
// bundle ID / package name in Google Cloud Console, and set a billing cap.
// Move it behind a backend before any real-world deployment.

import Constants from 'expo-constants';

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;
const PLACES_SEARCH_URL = 'https://places.googleapis.com/v1/places:searchNearby';
const ROUTES_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';

const MAX_RESULTS = 5;      // enough choice without overspending on Routes calls
const SEARCH_RADIUS_M = 8000; // 8km — reasonable urban emergency radius

export async function findNearbyHospitals(latitude, longitude) {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error(
      'Missing Google Maps API key. Set googleMapsApiKey in app.json under expo.extra.'
    );
  }
  if (latitude == null || longitude == null) {
    throw new Error('findNearbyHospitals requires a valid latitude and longitude.');
  }

  const places = await searchNearbyHospitals(latitude, longitude);
  if (places.length === 0) return [];

  // Get real driving distance/ETA for each candidate in parallel.
  const withRoutes = await Promise.all(
    places.map((place) => attachRoute(place, latitude, longitude))
  );

  // Sort by ETA (most useful ordering in an emergency — not raw distance,
  // since a closer hospital across a blocked road can be slower to reach).
  return withRoutes
    .filter((p) => p.etaMinutes !== null)
    .sort((a, b) => a.etaMinutes - b.etaMinutes);
}

async function searchNearbyHospitals(latitude, longitude) {
  const response = await fetch(PLACES_SEARCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
      // FieldMask keeps the response (and cost) minimal — only ask for what we use.
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.location,places.formattedAddress',
    },
    body: JSON.stringify({
      includedTypes: ['hospital'],
      maxResultCount: MAX_RESULTS,
      locationRestriction: {
        circle: {
          center: { latitude, longitude },
          radius: SEARCH_RADIUS_M,
        },
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Places API request failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const places = data.places || [];

  return places.map((p) => ({
    id: p.id,
    name: p.displayName?.text || 'Hospital',
    address: p.formattedAddress || '',
    latitude: p.location?.latitude,
    longitude: p.location?.longitude,
  }));
}

async function attachRoute(place, originLat, originLng) {
  try {
    const response = await fetch(ROUTES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
      },
      body: JSON.stringify({
        origin: { location: { latLng: { latitude: originLat, longitude: originLng } } },
        destination: {
          location: { latLng: { latitude: place.latitude, longitude: place.longitude } },
        },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE', // accounts for current road conditions
      }),
    });

    if (!response.ok) {
      // Don't let one failed route call break the whole list — just omit ETA for this one.
      return { ...place, distanceKm: null, etaMinutes: null };
    }

    const data = await response.json();
    const route = data.routes?.[0];
    if (!route) return { ...place, distanceKm: null, etaMinutes: null };

    const distanceKm = Math.round((route.distanceMeters / 1000) * 10) / 10;
    const durationSeconds = parseInt(route.duration.replace('s', ''), 10);
    const etaMinutes = Math.round(durationSeconds / 60);

    return { ...place, distanceKm, etaMinutes };
  } catch (e) {
    return { ...place, distanceKm: null, etaMinutes: null };
  }
}

// --- Setting the API key ---
// In app.json:
// {
//   "expo": {
//     "extra": { "googleMapsApiKey": "YOUR_KEY_HERE" }
//   }
// }
// Enable BOTH "Places API (New)" and "Routes API" in Google Cloud Console,
// on the same project/key, and set a billing budget alert before your demo.
