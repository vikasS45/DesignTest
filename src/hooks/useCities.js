import {useState} from 'react';
import {GET_CITIES} from '../constants/api_urls';

const useCities = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState(null);

  const getCity = async (params, successCallback) => {
    setLoading(true);
    try {
      const res = await fetch(GET_CITIES, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const json = await res.json();
      setLoading(false);
      console.log('City', json);
      if (res.status === 'success') {
        console.log('City Response', json.list);
        setCities(json.list);
        successCallback();
      } else {
        setErrors(json.message);
      }
    } catch (err) {
      console.error('ERROR =============> ', err);
      setErrors(err);
    }
  };

  return {
    loading,
    cities,
    errors,
    getCity,
  };
};

export default useCities;
