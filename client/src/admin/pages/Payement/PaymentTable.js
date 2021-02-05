import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import { cyan, pink, purple, orange } from "@material-ui/core/colors";
import Face from "@material-ui/icons/Face";
import InfoBox from "../../components/dashboard/InfoBox";
import Payment from "./Payment";
import globalStyles from "../../styles";
import Grid from "@material-ui/core/Grid";

import {useDispatch,useSelector} from 'react-redux';
import {adminPaymentsList} from '../../../actions/adminActions'

const PaymentRdv = () => {

  const dispatch = useDispatch(); 

    const adminListPayments = useSelector(state=>state.adminListPayments);
    const {payments} = adminListPayments

    useEffect(() => {
  
    dispatch(adminPaymentsList())
  
    }, [dispatch])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox color={orange[600]} title="Payement" value={payments && payments.length} />
        </Grid>
      </Grid>
      <br></br> <br></br>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Payment payments={payments} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentRdv;
