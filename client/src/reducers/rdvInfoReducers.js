import {
  RDV_ADD_DATE,
  RDV_ADD_PAYMENT_METHOD,
  RDV_ADD_RENSEIGNEMETS,
  RDV_INFO_RESET,
} from '../constants/rdvInfoConstants';

export const rdvInfoReducer = (
  state = {
    date: {},
    renseignements: {},
    paymentMethod: {},
  },
  action
) => {
  switch (action.type) {
    case RDV_ADD_DATE:
      return {
        ...state,
        date: action.payload,
      };

    case RDV_ADD_RENSEIGNEMETS:
      return {
        ...state,
        renseignements: action.payload,
      };

    case RDV_ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case RDV_INFO_RESET:
      return {
        date: {},
        renseignements: {},
        paymentMethod: {},
      };

    default:
      return state;
  }
};
