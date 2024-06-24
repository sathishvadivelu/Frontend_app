import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Colors from '../assets/Colors';
import {getWidthPercentage} from '../assets/Helpers';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomModal from './CustomModel';

const CustomerDetails = ({customers, setCustomers, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleEdit = customerId => {
    navigation.navigate('ProfileScreen', {customerId});
  };

  const handleDeleteSuccess = () => {
    setCustomers(
      customers.filter(customer => customer._id !== selectedCustomerId),
    );
  };

  const renderCustomerItem = ({item}) => (
    <View style={styles.container}>
      <Text style={styles.label}>
        {item.firstName} {item.lastName}
      </Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <Text style={styles.fetchData}>{item.dob}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.fetchData}>{item.phone}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.fetchData}>{item.email}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Account Number</Text>
        <Text style={styles.fetchData}>{item.bankAccountNo}</Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => handleEdit(item._id)}>
          <Feather name="edit" size={25} color={Colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedCustomerId(item._id);
            setModalVisible(true);
          }}>
          <AntDesign name="delete" size={25} color={Colors.textPrimary} />
        </TouchableOpacity>
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          customerId={selectedCustomerId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </View>
    </View>
  );
  return (
    <FlatList
      data={customers}
      renderItem={renderCustomerItem}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  container: {
    backgroundColor: Colors.surface,
    width: getWidthPercentage(90),
    marginTop: 20,
    padding: 20,
    position: 'relative',
  },
  labelContainer: {
    marginTop: 20,
  },
  label: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fetchData: {
    color: Colors.textPrimary,
    fontSize: 16,
    marginTop: 5,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 20,
    right: 20,
    width: getWidthPercentage(20),
  },
});

export default CustomerDetails;
