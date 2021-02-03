import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

import {
  doctorLoginReducer,
  doctorRegisterReducer,
  doctorDetailsReducer,
  doctorUpdateProfileReducer,
  doctorListReducer,
  doctorInfoByIdReducer,
  doctorReviewCreateReducer,
} from './reducers/doctorReducers';

import {
  deleteCancelledRdvReducer,
  doctorRdvListReducer,
  patientRdvListReducer,
  rdvCreateReducer,
  rdvDeliverReducer,
  rdvDetailsReducer,
  rdvPayReducer,
} from './reducers/rdvReducers';
import { rdvInfoReducer } from './reducers/rdvInfoReducers';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  doctorRegister: doctorRegisterReducer,
  doctorLogin: doctorLoginReducer,
  doctorList: doctorListReducer,
  doctorDetails: doctorDetailsReducer,
  doctorInfoById: doctorInfoByIdReducer,
  doctorUpdateProfile: doctorUpdateProfileReducer,
  doctorReviewCreate: doctorReviewCreateReducer,

  rdvInfo: rdvInfoReducer,
  rdvCreate: rdvCreateReducer,
  rdvDetails: rdvDetailsReducer,
  rdvPay: rdvPayReducer,
  rdvDeliver: rdvDeliverReducer,
  patientRdvList: patientRdvListReducer,
  doctorRdvList: doctorRdvListReducer,
  deleteCancelledRdv: deleteCancelledRdvReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const doctorInfoFromStorage = localStorage.getItem('doctorInfo')
  ? JSON.parse(localStorage.getItem('doctorInfo'))
  : null;

const dateFromStrorage = localStorage.getItem('date')
  ? JSON.parse(localStorage.getItem('date'))
  : null;

const renseignementsFromStorage = localStorage.getItem('renseignements')
  ? JSON.parse(localStorage.getItem('renseignements'))
  : {};

const initialState = {
  rdvInfo: {
    date: dateFromStrorage,
    renseignements: renseignementsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  doctorLogin: { doctorInfo: doctorInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
