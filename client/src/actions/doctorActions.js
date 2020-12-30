import axios from 'axios';
import {
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_LOGOUT,
  DOCTOR_REGISTER_FAIL,
  DOCTOR_REGISTER_REQUEST,
  DOCTOR_REGISTER_SUCCESS,
} from '../constants/doctorConstants';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: DOCTOR_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/doctors/login',
      { email, password },
      config
    );

    dispatch({
      type: DOCTOR_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('doctorInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DOCTOR_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const doctorLogout = () => dispatch => {
  localStorage.removeItem('doctorInfo');
  dispatch({ type: DOCTOR_LOGOUT });
};

export const register = (
  titre,
  prenom,
  nom,
  email,
  password,
  specialite,
  addressCabinet,
  ville,
  phoneCabinet,
  phonePersonel
) => async dispatch => {
  try {
    dispatch({
      type: DOCTOR_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/doctors/signup',
      {
        titre,
        prenom,
        nom,
        email,
        password,
        specialite,
        addressCabinet,
        ville,
        phoneCabinet,
        phonePersonel,
      },
      config
    );

    dispatch({ type: DOCTOR_REGISTER_SUCCESS, payload: data });

    dispatch({ type: DOCTOR_LOGIN_SUCCESS });

    localStorage.setItem('doctorInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DOCTOR_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
