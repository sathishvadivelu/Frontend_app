// components/Header.js
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../assets/Colors';
import {getHeightPercentage, getWidthPercentage} from '../assets/Helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({title, profileImage, navigation}) => {
  const imageUri = profileImage
    ? {uri: profileImage}
    : require('../assets/images/profile.png');

  const handleProfilePress = () => {
    console.log('clicked');
  };
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <TouchableOpacity>
          <Ionicons
            name={'reorder-three'}
            size={40}
            color={Colors.textPrimary}
            style={{marginRight: '28%'}}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleProfilePress}
        style={styles.profileContainer}>
        <Image source={imageUri} style={styles.profileImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: getWidthPercentage(100),
    height: getHeightPercentage(8),
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerText: {
    color: Colors.surface,
    fontSize: 20,
  },
  profileContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.surface,
    borderRadius: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default Header;
