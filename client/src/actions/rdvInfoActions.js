import {
  RDV_ADD_DATE,
  RDV_ADD_PAYMENT_METHOD,
  RDV_ADD_RENSEIGNEMETS,
} from '../constants/rdvInfoConstants';

export const saveDate = data => dispatch => {
  dispatch({
    type: RDV_ADD_DATE,
    payload: data,
  });

  localStorage.setItem('date', JSON.stringify(data));
};

export const saveRenseignements = data => dispatch => {
  dispatch({ type: RDV_ADD_RENSEIGNEMETS, payload: data });
  localStorage.setItem('renseignements', JSON.stringify(data));
};

export const savePaymentMethod = data => dispatch => {
  dispatch({
    type: RDV_ADD_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
