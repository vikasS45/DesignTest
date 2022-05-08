/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Colors, Image} from 'react-native-ui-lib';
import useLogin from '../../hooks/useLogin';

const width = Dimensions.get('window').width;
const Login = ({navigation}) => {
  const {login, loading, errors} = useLogin();

  const [data, setData] = useState({
    emailId: '',
    password: '',

    emailIdError: '',
    passwordError: '',
  });

  const required = inputField => {
    if (inputField.trim() === '') {
      return 'Required Field';
    }
    return '';
  };

  const navigateToSignUp = () => {
    navigation.navigate('Register');
  };

  const checkValidation = async () => {
    const errorMsg = {
      emailIdError: required(data.emailId),
      passwordError: required(data.password),
    };
    setData({...data, ...errorMsg});
  };

  const isFormValid = async () => {
    let flag = false;
    await checkValidation();
    flag = data.emailIdError === '' && data.passwordError === '';
    return flag;
  };

  const navigateToScreen = () => {
    navigation.navigate('Home');
  };

  const apiCallToLogin = async () => {
    let flag = await isFormValid();
    console.log('flag', flag);
    if (flag) {
      login({email: data.emailId, password: data.password}, handleCall);
    } else {
      return;
    }
  };

  const handleCall = async isTrue => {
    if (isTrue) {
      console.log('User Login');
      navigateToScreen();
    } else {
      console.log('User Not Login');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          assetName={'logoWithText'}
          style={styles.logo}
          resizeMode={'contain'}
        />

        <View
          style={[styles.textInput, data.emailIdError && styles.errorBorder]}>
          <Image
            assetName={'email'}
            style={styles.icon}
            resizeMode={'contain'}
          />
          <TextInput
            placeholder="Email Id"
            style={styles.textInputText}
            onChangeText={emailId => setData({...data, emailId})}
          />
        </View>
        {!!data.emailIdError && (
          <Text style={styles.error}>{data.emailIdError}</Text>
        )}

        <View
          style={[styles.textInput, data.passwordError && styles.errorBorder]}>
          <Image
            assetName={'lock'}
            style={styles.icon}
            resizeMode={'contain'}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.textInputText}
            onChangeText={password => setData({...data, password})}
          />
        </View>
        {!!data.passwordError && (
          <Text style={styles.error}>{data.passwordError}</Text>
        )}

        {!!errors && <Text style={styles.error}>{errors}</Text>}

        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        <TouchableOpacity onPress={apiCallToLogin} style={styles.button}>
          {loading ? (
            <ActivityIndicator size={20} color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.facebook]}>
            <Text style={styles.buttonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.google]}>
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.text}>
        Not yet a member?{' '}
        <Text style={styles.signUpText} onPress={navigateToSignUp}>
          Sign up{' '}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  logo: {
    height: width / 2,
    width: width / 2,
    alignSelf: 'center',
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
    color: Colors.lightGray,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputText: {
    marginLeft: 10,
  },
  icon: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  forgotPassword: {
    fontSize: 14,
    color: Colors.darkBlue,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  signUpText: {
    color: Colors.darkBlue,
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
  facebook: {
    backgroundColor: Colors.darkBlue,
    width: width / 2.5,
  },
  google: {
    backgroundColor: Colors.darkGray,
    width: width / 2.5,
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

export default Login;
