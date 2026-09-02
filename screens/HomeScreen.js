import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 30 }}>
        SENTINEL AI
      </Text>

      <Pressable
        onPress={() =>
          navigation.navigate('Assessment')
        }
      >
        <Text
          style={{
            fontSize: 24,
            color: 'red',
            marginTop: 30,
          }}
        >
          EMERGENCY
        </Text>
      </Pressable>
    </View>
  );
}