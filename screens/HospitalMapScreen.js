import React from 'react';

import {
  View,
  Text,
} from 'react-native';

export default function HospitalMapScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 28 }}>
        HOSPITAL MAP
      </Text>

      <Text style={{ marginTop: 20 }}>
        Hospital results will appear here.
      </Text>
    </View>
  );
}