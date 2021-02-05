import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import { cyan, pink, purple, orange } from "@material-ui/core/colors";
import Face from "@material-ui/icons/Face";
import InfoBox from "../../components/dashboard/InfoBox";
import RecentlyUser from "./User";
import globalStyles from "../../styles";
import Grid from "@material-ui/core/Grid";

import {useDispatch,useSelector} from 'react-redux';
import {adminUsersList, adminDrsList} from '../../../actions/adminActions'


const UserTable = () => {

  const dispatch = useDispatch(); 

    const adminListUsers = useSelector(state=>state.adminListUsers);
    const {users} = adminListUsers

    useEffect(() => {
  
    dispatch(adminUsersList())
  
    }, [dispatch])

    
  return (
    <div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/admin/table/user" className="button">
            <InfoBox Icon={Face} color={pink[600]} title="User " value={users && users.length} />
          </Link>
        </Grid>
        
      </Grid>
      <br></br> <br></br>
      
      <Grid  spacing={4}>
        <Grid item xs={12} sm={12}>
          <RecentlyUser users={users} />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserTable;
