/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors, RadioGroup, RadioButton, Checkbox} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useRegister from '../../hooks/useRegister';

const Register = ({navigation}) => {
  const {register, registered, loading} = useRegister();
  const [data, setData] = useState({
    userName: '',
    emailId: '',
    mobileNumber: '',
    password: '',
    city: '',
    userType: 'User',
    termsCheck: false,

    userNameError: '',
    emailIdError: '',
    mobileNumberError: '',
    passwordError: '',
    cityError: '',
    userTypeError: '',
    termsCheckError: '',
  });

  const pickerData = [
    {label: 'Pune', value: 'Pune'},
    {label: 'Mumbai', value: 'Mumbai'},
    {label: 'Nagpur', value: 'Nagpur'},
    {label: 'Shirdi', value: 'Shirdi'},
    {label: 'Other', value: 'Other'},
  ];

  const mobileValidation = number => {
    const reg = /^[0]?[6789]\d{9}$/;
    if (number.trim() === '') {
      return 'Required Field';
    }
    if (number.length < 10) {
      return 'Mobile Number length must be 10.';
    }
    if (reg.test(number) === false) {
      return 'Invalid Mobile Number';
    }
    return '';
  };

  const required = inputField => {
    if (inputField.trim() === '') {
      return 'Required Field';
    }
    return '';
  };

  const emailValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(data.emailId) === false) {
      return 'Invalid Email-Id';
    } else {
      return '';
    }
  };

  const checkValidation = async () => {
    const errorMsg = {
      userNameError: required(data.userName),
      emailIdError: emailValidation(),
      mobileNumberError: mobileValidation(data.mobileNumber),
      passwordError: required(data.password),
      cityError: required(data.city),
    };
    setData({...data, ...errorMsg});
  };

  const isFormValid = async () => {
    await checkValidation();
    const flag =
      data.userNameError === '' &&
      data.emailIdError === '' &&
      data.mobileNumberError === '' &&
      data.passwordError === '' &&
      data.cityError === '';

    return flag;
  };

  const navigateToScreen = () => {
    navigation.navigate('Login');
  };

  const apiCallToRegister = async () => {
    const flag = await isFormValid();
    if (flag) {
      register(
        {
          email: data.emailId,
          username: data.userName,
          contact: data.mobileNumber,
          user_type: 'BIDDER',
          address: 'Pune Railway Station',
          latitude: 18.5288183,
          longitude: 73.87443669999999,

          password: data.password,

          social_id: '',
          social_type: '',
          city_id: 12,
        },
        handleCall,
      );
    } else {
      return;
    }
  };

  const handleCall = async () => {
    if (registered) {
      console.log('User Registered');
      navigateToScreen();
    } else {
      console.log('User Not Registerd');
      // navigateToScreen();
    }
  };

  const Header = () => {
    return (
      <View>
        <AntDesign
          name="arrowleft"
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.registerText}>Registration</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        style={[styles.textInput, data.userNameError && styles.errorBorder]}
        placeholder="Username"
        onChangeText={userName => setData({...data, userName})}
      />
      {!!data.userNameError && (
        <Text style={styles.error}>{data.userNameError}</Text>
      )}

      <TextInput
        style={[styles.textInput, data.emailIdError && styles.errorBorder]}
        placeholder="Email Id"
        onChangeText={emailId => setData({...data, emailId})}
      />
      {!!data.emailIdError && (
        <Text style={styles.error}>{data.emailIdError}</Text>
      )}

      <TextInput
        style={[styles.textInput, data.mobileNumberError && styles.errorBorder]}
        placeholder="Mobile Number"
        maxLength={10}
        onChangeText={mobileNumber => setData({...data, mobileNumber})}
      />
      {!!data.mobileNumberError && (
        <Text style={styles.error}>{data.mobileNumberError}</Text>
      )}

      <TextInput
        style={[styles.textInput, data.passwordError && styles.errorBorder]}
        placeholder="Password"
        secureTextEntry
        onChangeText={password => setData({...data, password})}
      />
      {!!data.passwordError && (
        <Text style={styles.error}>{data.passwordError}</Text>
      )}

      <View style={[styles.textInput, data.cityError && styles.errorBorder]}>
        <Picker
          style={styles.picker}
          selectedValue={data.city}
          onValueChange={(itemValue, itemIndex) =>
            setData({...data, city: itemValue})
          }>
          {pickerData?.map(item => {
            return (
              <Picker.Item
                label={item.label}
                value={item.value}
                color={Colors.darkBlack}
                fontFamily="SofiaProRegular"
              />
            );
          })}
        </Picker>
      </View>

      {!!data.cityError && <Text style={styles.error}>{data.cityError}</Text>}

      <RadioGroup
        initialValue={data.userType}
        style={styles.radioGroup}
        onValueChange={e => setData({...data, userType: e})}>
        <RadioButton
          value={'User'}
          label={'User'}
          color={Colors.black}
          size={18}
        />
        <RadioButton
          value={'Service Provider'}
          label={'Service Provider'}
          color={Colors.black}
          size={18}
        />
      </RadioGroup>
      <View style={styles.row}>
        <Checkbox
          value={data.termsCheck}
          color={Colors.lightGray}
          size={18}
          outline={false}
          onValueChange={termsCheck => setData({...data, termsCheck})}
        />
        <Text style={styles.text}>
          I accept all the{' '}
          <Text style={styles.underLineText}>Terms & Conditions</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={apiCallToRegister} style={styles.button}>
        {loading ? (
          <ActivityIndicator size={20} color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 40,
    height: 40,
    borderColor: Colors.lightGray,
    fontSize: 14,
    paddingHorizontal: 20,
    color: Colors.black,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    marginLeft: 5,
  },
  underLineText: {
    color: Colors.darkBlue,
    textDecorationLine: 'underline',
  },
  error: {
    color: Colors.red,
    marginTop: 2,
    fontWeight: '400',
    fontSize: 12,
    marginLeft: 25,
  },
  errorBorder: {
    borderColor: Colors.red,
  },
  picker: {
    width: '100%',
    alignSelf: 'flex-end',
    color: Colors.darkBlack,
  },
  backArrow: {
    fontSize: 25,
    color: Colors.darkBlack,
    marginLeft: 10,
    marginTop: 20,
  },
  registerText: {
    color: Colors.darkBlack,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    height: 40,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 20,
  },
});

export default Register;
