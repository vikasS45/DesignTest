import {useState} from 'react';
import {LOGIN_URL} from '../constants/api_urls';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [errors, setErrors] = useState('');

  const login = async (params, successCallback) => {
    setLoading(true);
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const json = await res.json();
      setLoading(false);
      if (json.status === 'success') {
        console.log('Successd');
        setUser(true);
        setErrors(null);
      } else {
        setErrors(json.message);
      }
      successCallback(user);
    } catch (err) {
      console.error('ERROR =============> ', err);
      setErrors(err);
    }
  };

  return {
    loading,
    user,
    errors,
    login,
  };
};

export default useLogin;
