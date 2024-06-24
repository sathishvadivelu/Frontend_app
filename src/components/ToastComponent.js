import Toast from 'react-native-toast-message';

const showToast = (type, text1, text2) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    position: 'top',
  });
};

export default showToast;
