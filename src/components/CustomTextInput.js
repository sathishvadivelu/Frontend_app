import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../assets/Helpers';
import Colors from '../assets/Colors';

const CustomTextInput = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  label,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: getWidthPercentage(90),
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: Colors.textSecondary,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: Colors.textPrimary,
  },
  label: {
    color: Colors.textPrimary,
    marginBottom: 5,
  },
});

export default CustomTextInput;
