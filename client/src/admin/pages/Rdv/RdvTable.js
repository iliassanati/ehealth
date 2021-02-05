import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import { cyan, pink, purple, orange } from "@material-ui/core/colors";
import Face from "@material-ui/icons/Face";
import InfoBox from "../../components/dashboard/InfoBox";
import Rdv from "./Rdv";
import globalStyles from "../../styles";
import Grid from "@material-ui/core/Grid";

import {useDispatch,useSelector} from 'react-redux';
import { adminRdvsList} from '../../../actions/adminActions'


const RdvTable = () => {

  const dispatch = useDispatch(); 

    const adminListRdvs = useSelector(state=>state.adminListRdvs);
    const {rdvs} = adminListRdvs

    useEffect(() => {
  
    dispatch(adminRdvsList())
  
    }, [dispatch])


  return (
    <div>
     <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox color={purple[600]} title="Rdv" value={rdvs && rdvs.length} />
        </Grid>
      </Grid>
      <br></br> <br></br>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Rdv rdvs={rdvs} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RdvTable;
