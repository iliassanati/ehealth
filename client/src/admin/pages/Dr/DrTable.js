import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import { cyan, pink, purple, orange } from "@material-ui/core/colors";
import Face from "@material-ui/icons/Face";
import InfoBox from "../../components/dashboard/InfoBox";
import Dr from "./Dr";
import globalStyles from "../../styles";
import Grid from "@material-ui/core/Grid";

import {useDispatch,useSelector} from 'react-redux';
import {adminUsersList, adminDrsList} from '../../../actions/adminActions'

const DrTable = () => {

  const dispatch = useDispatch(); 

    const adminListDrs = useSelector(state=>state.adminListDrs);
    const {drs} = adminListDrs

    useEffect(() => {
  
    dispatch(adminDrsList())
  
    }, [dispatch])

   
  return (
    <div>
      <h3 style={globalStyles.navigation}>E-health Admin / Dashboard</h3>
      <br></br>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox Icon={Face} color={cyan[600]} title="Doctor" value={drs && drs.length} />
        </Grid>
      </Grid>
      <br></br> <br></br>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Dr drs={drs} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DrTable;
