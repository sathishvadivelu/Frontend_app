import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const getWidthPercentage = percentage => {
  return (width * percentage) / 100;
};

export const getHeightPercentage = percentage => {
  return (height * percentage) / 100;
};
