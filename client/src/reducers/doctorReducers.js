import {
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_REGISTER_REQUEST,
  DOCTOR_REGISTER_SUCCESS,
  DOCTOR_REGISTER_FAIL,
  DOCTOR_LOGOUT,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_RESET,
  DOCTOR_UPDATE_PROFILE_REQUEST,
  DOCTOR_UPDATE_PROFILE_SUCCESS,
  DOCTOR_UPDATE_PROFILE_FAIL,
  DOCTOR_UPDATE_PROFILE_RESET,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_LIST_REQUEST,
  DOCTOR_INFO_REQUEST,
  DOCTOR_INFO_SUCCESS,
  DOCTOR_INFO_FAIL,
  DOCTOR_CREATE_REVIEW_REQUEST,
  DOCTOR_CREATE_REVIEW_SUCCESS,
  DOCTOR_CREATE_REVIEW_FAIL,
  DOCTOR_CREATE_REVIEW_RESET,
} from '../constants/doctorConstants';

export const doctorLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_LOGIN_REQUEST:
      return {
        loading: true,
      };

    case DOCTOR_LOGIN_SUCCESS:
      return {
        loading: false,
        doctorInfo: action.payload,
      };
    case DOCTOR_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DOCTOR_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const doctorRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case DOCTOR_REGISTER_SUCCESS:
      return {
        loading: false,
        doctorInfo: action.payload,
      };

    case DOCTOR_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const doctorListReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return {
        loading: true,
        doctors: [],
      };

    case DOCTOR_LIST_SUCCESS:
      return {
        loading: false,
        doctors: action.payload,
      };

    case DOCTOR_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const doctorDetailsReducer = (
  state = { doctor: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case DOCTOR_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DOCTOR_DETAILS_SUCCESS:
      return {
        loading: false,
        doctor: action.payload,
      };

    case DOCTOR_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DOCTOR_DETAILS_RESET: {
      return {
        doctor: {},
      };
    }
    default:
      return state;
  }
};

export const doctorInfoByIdReducer = (
  state = { doctor: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case DOCTOR_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DOCTOR_INFO_SUCCESS:
      return {
        loading: false,
        doctor: action.payload,
      };

    case DOCTOR_INFO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const doctorUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DOCTOR_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        doctorInfo: action.payload,
      };

    case DOCTOR_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DOCTOR_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const doctorReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DOCTOR_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case DOCTOR_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DOCTOR_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
