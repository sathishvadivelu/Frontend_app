import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../assets/Colors';
import {getHeightPercentage, getWidthPercentage} from '../assets/Helpers';
import CustomTextInput from '../components/CustomTextInput';
import DateComponent from '../components/DateComponent';
import CustomButton from '../components/CustomButton';
import {fetchData, postData, updateData} from '../apiservice/ApiService';
import showToast from '../components/ToastComponent';

const ProfileScreen = ({route, navigation}) => {
  const {customerId} = route.params || {};
  // TextInputs and DatePicker state

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    accountNo: '',
    phone: '',
    date: new Date(),
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (customerId) {
      fetchCustomerData(customerId);
    }
  }, [customerId]);

  // Function to fetch customer data by customerId
  const fetchCustomerData = async id => {
    try {
      const response = await fetchData(`/api/customers/${id}`);
      console.log('response', typeof response.dob);
      const {firstName, lastName, email, bankAccountNo, phone, dob} = response;
      setFormData({
        firstName,
        lastName,
        email,
        accountNo: bankAccountNo,
        phone,
        date: new Date(dob),
      });
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleConfirm = selectedDate => {
    setOpen(false);
    setFormData({...formData, date: selectedDate});
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const validateFields = () => {
    const {firstName, lastName, email, accountNo, phone, date} = formData;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (!firstName || !lastName || !email || !accountNo || !phone || !date) {
      showToast('error', 'Validation Error', 'All fields are required.');
      return false;
    }
    if (!emailRegex.test(email)) {
      showToast('error', 'Validation Error', 'Invalid email format.');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      showToast(
        'error',
        'Validation Error',
        'Should Be Country Code with 10-digit Phone Number.',
      );
      return false;
    }
    return true;
  };

  const handleButtonPress = async () => {
    if (!validateFields()) return;
    const {firstName, lastName, email, accountNo, phone, date} = formData;
    const dataToSend = {
      firstName,
      lastName,
      email,
      bankAccountNo: accountNo,
      phone,
      dob: date.toISOString().split('T')[0],
    };

    try {
      if (customerId) {
        // GetbyId---------------
        await updateData(`/api/customers/${customerId}`, dataToSend);
        console.log('Customer data updated successfully');
      } else {
        // Post------------------
        const response = await postData('/api/customers', dataToSend);
        console.log('New customer created:', response);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error posting customer data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileDetails}>
        <Text style={styles.title}>Create Customer</Text>
        <CustomTextInput
          placeholder="(e.g)Sathish"
          onChangeText={text => handleInputChange('firstName', text)}
          value={formData.firstName}
          label="First Name"
        />
        <CustomTextInput
          placeholder="(e.g)Kumar"
          onChangeText={text => handleInputChange('lastName', text)}
          value={formData.lastName}
          label="Last Name"
        />
        <DateComponent
          date={formData.date}
          open={open}
          setOpen={setOpen}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          label="Date of birth"
          placeholder="(e.g)08-11-2000"
        />
        <CustomTextInput
          placeholder="(e.g)example@gmail.com"
          onChangeText={text => handleInputChange('email', text)}
          value={formData.email}
          label="Email"
        />
        <CustomTextInput
          placeholder="(e.g)8525825116"
          onChangeText={text => handleInputChange('phone', text)}
          value={formData.phone}
          label="Phone Number"
        />
        <CustomTextInput
          placeholder="(e.g)41-652-615"
          onChangeText={text => handleInputChange('accountNo', text)}
          value={formData.accountNo}
          label="Account Number"
        />

        <CustomButton
          title="Create"
          onPress={handleButtonPress}
          buttonStyle={{marginTop: 20, backgroundColor: Colors.primary}}
          textStyle={{fontSize: 20}}
        />
        <CustomButton
          title="Discard"
          onPress={() =>
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              accountNo: '',
              phone: '',
              date: new Date(),
            })
          }
          buttonStyle={{marginTop: 20, backgroundColor: Colors.background}}
          textStyle={{fontSize: 20, color: Colors.textPrimary}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  profileDetails: {
    width: getWidthPercentage(90),
    height: getHeightPercentage(100),
    paddingVertical: 10,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
  },
});

export default ProfileScreen;
