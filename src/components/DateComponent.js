import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {getWidthPercentage} from '../assets/Helpers';
import Colors from '../assets/Colors';

const DateComponent = ({
  open,
  date,
  handleConfirm,
  handleCancel,
  lable,
  placeholder,
  setOpen,
}) => {
  return (
    <View style={StyleSheet.container}>
      <Text>{lable}</Text>
      <TouchableOpacity style={styles.datebox} onPress={() => setOpen(true)}>
        <Text style={styles.placeholder}>
          {date ? date.toISOString().split('T')[0] : placeholder}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        mode="date"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getWidthPercentage(90),
    marginVertical: 10,
  },
  datebox: {
    height: 40,
    borderColor: Colors.textSecondary,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: Colors.textPrimary,
  },
  placeholder: {
    color: Colors.textPrimary,
    marginTop: 10,
  },
});

export default DateComponent;
