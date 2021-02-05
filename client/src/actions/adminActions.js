import axios from "axios";
import { ADMIN_USER_LIST_FAIL, ADMIN_USER_LIST_REQUEST, ADMIN_USER_LIST_SUCCESS,
         ADMIN_DR_LIST_FAIL, ADMIN_DR_LIST_REQUEST, ADMIN_DR_LIST_SUCCESS,
         ADMIN_RDV_LIST_FAIL, ADMIN_RDV_LIST_REQUEST, ADMIN_RDV_LIST_SUCCESS,
         ADMIN_PAYMENT_LIST_FAIL, ADMIN_PAYMENT_LIST_REQUEST, ADMIN_PAYMENT_LIST_SUCCESS } from "../constants/adminConstants"




export const adminUsersList = () => async (dispatch,getState)=>{
    try {
       dispatch({type: ADMIN_USER_LIST_REQUEST}) 

     //  const {
   //        adminLogin:{adminInfo},
   //    } = getState();

    //    const config = {
    //       headers: {
    //           Authorization: `Bearer ${adminInfo.token}`,
    //       }
  //     };

       const {data} = await axios.get(`/api/users`);

       dispatch({type: ADMIN_USER_LIST_SUCCESS, payload: data})
    } catch (error) {

          const message =
              error.response && error.response.data.message
               ? error.response.data.message
                     : error.message;
                //  if (message === 'Not authorized, token failed') {
                //    dispatch(logout());
                //  }
                 dispatch({
                   type: ADMIN_USER_LIST_FAIL,
                   payload: message,
                 });
               }
};

export const adminDrsList = () => async (dispatch,getState)=>{
  try {
     dispatch({type: ADMIN_DR_LIST_REQUEST}) 

   //  const {
 //        adminLogin:{adminInfo},
 //    } = getState();

  //    const config = {
  //       headers: {
  //           Authorization: `Bearer ${adminInfo.token}`,
  //       }
//     };

     const {data} = await axios.get(`/api/doctors`);

     dispatch({type: ADMIN_DR_LIST_SUCCESS, payload: data})
  } catch (error) {

        const message =
            error.response && error.response.data.message
             ? error.response.data.message
                   : error.message;
              //  if (message === 'Not authorized, token failed') {
              //    dispatch(logout());
              //  }
               dispatch({
                 type: ADMIN_DR_LIST_FAIL,
                 payload: message,
               });
             }
};


export const adminRdvsList = () => async (dispatch,getState)=>{
  try {
     dispatch({type: ADMIN_RDV_LIST_REQUEST}) 

   //  const {
 //        adminLogin:{adminInfo},
 //    } = getState();

  //    const config = {
  //       headers: {
  //           Authorization: `Bearer ${adminInfo.token}`,
  //       }
//     };

     const {data} = await axios.get(`/api/rdvs`);

     dispatch({type: ADMIN_RDV_LIST_SUCCESS, payload: data})
  } catch (error) {

        const message =
            error.response && error.response.data.message
             ? error.response.data.message
                   : error.message;
              //  if (message === 'Not authorized, token failed') {
              //    dispatch(logout());
              //  }
               dispatch({
                 type: ADMIN_RDV_LIST_FAIL,
                 payload: message,
               });
             }
};


export const adminPaymentsList = () => async (dispatch,getState)=>{
  try {
     dispatch({type: ADMIN_PAYMENT_LIST_REQUEST}) 

   //  const {
 //        adminLogin:{adminInfo},
 //    } = getState();

  //    const config = {
  //       headers: {
  //           Authorization: `Bearer ${adminInfo.token}`,
  //       }
//     };

     const {data} = await axios.get(`/api/payments`);

     dispatch({type: ADMIN_PAYMENT_LIST_SUCCESS, payload: data})
  } catch (error) {

        const message =
            error.response && error.response.data.message
             ? error.response.data.message
                   : error.message;
              //  if (message === 'Not authorized, token failed') {
              //    dispatch(logout());
              //  }
               dispatch({
                 type: ADMIN_PAYMENT_LIST_FAIL,
                 payload: message,
               });
             }
};


           
    
