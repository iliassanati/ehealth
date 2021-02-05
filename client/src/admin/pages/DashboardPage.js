import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import { cyan, pink, purple, orange } from "@material-ui/core/colors";
import Assessment from "@material-ui/icons/Assessment";
import Face from "@material-ui/icons/Face";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import InfoBox from "../components/dashboard/InfoBox";
import RecentlyUser from "../components/dashboard/RecentlyUser";
import RecentlyRdv from "../components/dashboard/RecentlyRdv";
import RecentlyDr from "../components/dashboard/RecentlyDr";
import RecentlyPayement from "../components/dashboard/RecentlyPayement";
import globalStyles from "../styles";
import Grid from "@material-ui/core/Grid";

import {useDispatch,useSelector} from 'react-redux';
import {adminUsersList, adminDrsList} from '../../actions/adminActions'

import Data from "../data";

const DashboardPage = () => {

  const dispatch = useDispatch(); 

    const adminListUsers = useSelector(state=>state.adminListUsers);
    const {users} = adminListUsers

    useEffect(() => {
  
    dispatch(adminUsersList())
  
    }, [dispatch])

    const adminListDrs = useSelector(state=>state.adminListDrs);
    const {drs} = adminListDrs

    useEffect(() => {
  
    dispatch(adminDrsList())
  
    }, [dispatch])

    const adminListRdvs = useSelector(state=>state.adminListRdvs);
    const {rdvs} = adminListRdvs

    useEffect(() => {
  
    dispatch(adminDrsList())
  
    }, [dispatch])

    const adminListPayments = useSelector(state=>state.adminListPayments);
    const {payments} = adminListPayments

    useEffect(() => {
  
    dispatch(adminDrsList())
  
    }, [dispatch])

  return (
    <div>
      <h3 style={globalStyles.navigation}>E-health Admin / Dashboard</h3>
      <br></br>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/admin/table/user" className="button">
            <InfoBox Icon={Face} color={pink[600]} title="User" value={users && users.length} />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox Icon={Face} color={cyan[600]} title="Doctor" value={drs && drs.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox Icon={Assessment} color={purple[600]} title="Rdv" value={rdvs && rdvs.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox Icon={Assessment} color={orange[600]} title="Payement" value={payments && payments.length} />
        </Grid>
      </Grid>
      <br></br> <br></br>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RecentlyUser users={users} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <RecentlyDr drs={drs} />
        </Grid>
      </Grid>
      <br></br> <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RecentlyRdv rdvs={rdvs} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <RecentlyPayement payments={payments} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
