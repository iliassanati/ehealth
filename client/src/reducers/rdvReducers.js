import {
  RDV_CREATE_FAIL,
  RDV_CREATE_REQUEST,
  RDV_CREATE_SUCCESS,
  RDV_DETAILS_FAIL,
  RDV_DETAILS_REQUEST,
  RDV_DETAILS_SUCCESS,
  RDV_PAY_FAIL,
  RDV_PAY_REQUEST,
  RDV_PAY_RESET,
  RDV_PAY_SUCCESS,
  RDV_DELIVER_REQUEST,
  RDV_DELIVER_SUCCESS,
  RDV_DELIVER_FAIL,
  RDV_DELIVER_RESET,
  RDV_PATIENT_LIST_REQUEST,
  RDV_PATIENT_LIST_SUCCESS,
  RDV_PATIENT_LIST_FAIL,
  RDV_PATIENT_LIST_RESET,
  RDV_DOCTOR_LIST_REQUEST,
  RDV_DOCTOR_LIST_SUCCESS,
  RDV_DOCTOR_LIST_FAIL,
  RDV_DOCTOR_LIST_RESET,
  RDV_DELETE_CANCELLED_REQUEST,
  RDV_DELETE_CANCELLED_SUCCESS,
  RDV_DELETE_CANCELLED_FAIL,
  RDV_DELETE_CANCELLED_RESET,
  RDV_DETAILS_RESET,
} from '../constants/rdvConstants';

export const rdvCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RDV_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RDV_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        rdv: action.payload,
      };

    case RDV_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const rdvDetailsReducer = (state = { rdv: {} }, action) => {
  switch (action.type) {
    case RDV_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RDV_DETAILS_SUCCESS:
      return {
        loading: false,
        rdv: action.payload,
      };

    case RDV_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RDV_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const rdvPayReducer = (state = {}, action) => {
  switch (action.type) {
    case RDV_PAY_REQUEST:
      return {
        loading: true,
      };
    case RDV_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case RDV_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RDV_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const rdvDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case RDV_DELIVER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RDV_DELIVER_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case RDV_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RDV_DELIVER_RESET:
      return {};

    default:
      return state;
  }
};

export const patientRdvListReducer = (state = { rdvs: [] }, action) => {
  switch (action.type) {
    case RDV_PATIENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RDV_PATIENT_LIST_SUCCESS:
      return {
        loading: false,
        rdvs: action.payload,
      };

    case RDV_PATIENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RDV_PATIENT_LIST_RESET:
      return {
        rdvs: [],
      };

    default:
      return state;
  }
};

export const doctorRdvListReducer = (state = { rdvs: [] }, action) => {
  switch (action.type) {
    case RDV_DOCTOR_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RDV_DOCTOR_LIST_SUCCESS:
      return {
        loading: false,
        rdvs: action.payload,
      };

    case RDV_DOCTOR_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RDV_DOCTOR_LIST_RESET:
      return {
        rdvs: [],
      };

    default:
      return state;
  }
};

export const deleteCancelledRdvReducer = (state = { rdv: {} }, action) => {
  switch (action.type) {
    case RDV_DELETE_CANCELLED_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RDV_DELETE_CANCELLED_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case RDV_DELETE_CANCELLED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RDV_DELETE_CANCELLED_RESET:
      return {};

    default:
      return state;
  }
};
