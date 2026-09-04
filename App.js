// App.js

import React, { useCallback } from 'react';
import { View } from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from 'expo-font';

import {
  colors,
  fontsToLoad,
} from './theme';

import HomeScreen from './screens/HomeScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import HospitalMapScreen from './screens/HospitalMapScreen';

// Keep splash screen visible until ALL fonts are loaded.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const NavTheme = {
  ...DefaultTheme,

  dark: true,

  colors: {
    ...DefaultTheme.colors,
    background: colors.ink,
    card: colors.ink,
    text: colors.paper,
    border: colors.border,
    primary: colors.trust,
  },
};

export default function App() {
  const [fontsLoaded, fontError] =
    useFonts(fontsToLoad);

  const onLayoutRootView = useCallback(
    async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    },
    [fontsLoaded, fontError]
  );

  // Keep splash screen visible while fonts load.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.ink,
      }}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer theme={NavTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: {
              backgroundColor: colors.ink,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            name="Assessment"
            component={AssessmentScreen}
          />

          <Stack.Screen
            name="HospitalMap"
            component={HospitalMapScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}