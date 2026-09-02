import React from 'react';

import {
  View,
  Text,
  Pressable,
} from 'react-native';

export default function AssessmentScreen({
  navigation,
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 28 }}>
        ASSESSMENT
      </Text>

      <Pressable
        onPress={() =>
          navigation.navigate('HospitalMap')
        }
      >
        <Text
          style={{
            fontSize: 20,
            color: 'blue',
            marginTop: 30,
          }}
        >
          FIND HOSPITAL
        </Text>
      </Pressable>
    </View>
  );
}