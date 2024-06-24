import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../components/Header';
import Colors from '../assets/Colors';
import CustomButton from '../components/CustomButton';
import {getWidthPercentage} from '../assets/Helpers';
import CustomTextInput from '../components/CustomTextInput';
import CustomerDetails from '../components/CustomerDetails';
import {getAllCustomers} from '../apiservice/ApiService';

const HomeScreen = ({navigation, route}) => {
  const {profileImage} = route.params || {
    profileImage: '',
  };

  //   Button--------------------------------

  const handleButtonPress = () => {
    navigation.navigate('ProfileScreen');
  };

  // Search Input----------------

  const [search, setSearch] = useState('');

  const handleSearch = text => {
    setSearch(text);
  };

  // GetAll---------------------------------------------

  const [customers, setCustomers] = useState([]);

  const fetchAllCustomers = useCallback(async () => {
    try {
      const data = await getAllCustomers('/api/customers');
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAllCustomers();
    });

    return unsubscribe;
  }, [navigation, fetchAllCustomers]);

  return (
    <View style={styles.container}>
      <Header
        title="Home"
        profileImage={profileImage}
        navigation={navigation}
      />
      <Text style={styles.title}>Customers</Text>
      <View style={styles.createCustomer}>
        <CustomButton
          title="Create Customer"
          onPress={handleButtonPress}
          buttonStyle={{marginTop: 20, backgroundColor: Colors.primary}}
          textStyle={{fontSize: 20}}
        />

        <CustomTextInput
          placeholder="search"
          onChangeText={handleSearch}
          value={search}
        />
      </View>
      <CustomerDetails
        customers={customers}
        setCustomers={setCustomers}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  createCustomer: {
    backgroundColor: Colors.surface,
    width: getWidthPercentage(90),
    padding: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
