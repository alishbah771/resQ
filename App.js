import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import HospitalMapScreen from './screens/HospitalMapScreen';

import { COLORS } from './theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
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
  );
}