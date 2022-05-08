import {useState} from 'react';
import {REGISTER_URL} from '../constants/api_urls';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [registered, setRegister] = useState(false);
  const [errors, setErrors] = useState(null);

  const register = async (params, successCallback) => {
    setLoading(true);
    try {
      const res = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const json = await res.json();
      setLoading(false);
      console.log('Registered Api', JSON.stringify(json));
      if (json?.otp) {
        setRegister(true);
      } else {
        setErrors(json.message);
      }
      successCallback();
    } catch (err) {
      console.error('ERROR =============> ', err);
      setErrors(err);
    }
  };

  return {
    loading,
    registered,
    errors,
    register,
  };
};

export default useRegister;
