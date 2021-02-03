import axios from 'axios';
import {
  DOCTOR_CREATE_REVIEW_FAIL,
  DOCTOR_CREATE_REVIEW_REQUEST,
  DOCTOR_CREATE_REVIEW_SUCCESS,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_RESET,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_INFO_FAIL,
  DOCTOR_INFO_REQUEST,
  DOCTOR_INFO_SUCCESS,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_LOGOUT,
  DOCTOR_REGISTER_FAIL,
  DOCTOR_REGISTER_REQUEST,
  DOCTOR_REGISTER_SUCCESS,
  DOCTOR_UPDATE_PROFILE_FAIL,
  DOCTOR_UPDATE_PROFILE_REQUEST,
  DOCTOR_UPDATE_PROFILE_SUCCESS,
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
  dispatch({ type: DOCTOR_DETAILS_RESET });
  document.location.href = '/';
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

    dispatch({ type: DOCTOR_LOGIN_SUCCESS, payload: data });

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

export const listDoctors = (keyword1 = '', keyword2 = '') => async dispatch => {
  try {
    dispatch({ type: DOCTOR_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/doctors?keyword1=${keyword1}&keyword2=${keyword2}`
    );

    dispatch({ type: DOCTOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DOCTOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDoctorDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_DETAILS_REQUEST });
    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${doctorInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/doctors/${id}`, config);

    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(doctorLogout());
    }
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateDoctorProfile = doctor => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_UPDATE_PROFILE_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${doctorInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/doctors/profile`, doctor, config);

    dispatch({
      type: DOCTOR_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: DOCTOR_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('doctorInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(doctorLogout());
    }
    dispatch({
      type: DOCTOR_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const getDoctorInfo = id => async dispatch => {
  try {
    dispatch({ type: DOCTOR_INFO_REQUEST });

    const { data } = await axios.get(`/api/doctors/${id}`);

    dispatch({ type: DOCTOR_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DOCTOR_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createDoctorReview = (id, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DOCTOR_CREATE_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/doctors/${id}/reviews`, review, config);

    dispatch({ type: DOCTOR_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: DOCTOR_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
