import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../assets/Helpers';
import Colors from '../assets/Colors';
import CustomButton from './CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {deleteData} from '../apiservice/ApiService';

const CustomModal = ({visible, onClose, customerId, onDeleteSuccess}) => {
  const handleButtonPress = async () => {
    try {
      await deleteData(`/api/customers/${customerId}`);
      console.log('Customer deleted successfully');
      onDeleteSuccess(); // Call the success callback
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Delete Customer</Text>
          <Text style={styles.confirm}>
            Do you want delete sathish details?
          </Text>

          <CustomButton
            title="Yes"
            onPress={handleButtonPress}
            buttonStyle={{marginTop: 20, backgroundColor: Colors.yellow}}
            textStyle={{fontSize: 20}}
          />
          <CustomButton
            title="No"
            onPress={onClose}
            buttonStyle={{marginTop: 20, backgroundColor: Colors.surface}}
            textStyle={{fontSize: 20, color: Colors.textPrimary}}
          />
          <View style={styles.closeIcon}>
            <TouchableOpacity onPress={onClose}>
              <AntDesign
                name="closecircleo"
                size={25}
                color={Colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'relative',
    width: getWidthPercentage(100),
    height: getHeightPercentage(30),
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  confirm: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginTop: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default CustomModal;
