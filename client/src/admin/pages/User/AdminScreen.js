import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {adminRdvsList, adminPaymentsList} from '../../../actions/adminActions'

const AdminScreen = () => {

    const dispatch = useDispatch();

    const adminListRdvs = useSelector(state=>state.adminListRdvs);
    const {rdvs} = adminListRdvs

    useEffect(() => {
  
    dispatch(adminRdvsList())
  
    }, [dispatch])


    const adminListPayments = useSelector(state=>state.adminListPayments);
    const {payments} = adminListPayments

    useEffect(() => {
  
    dispatch(adminPaymentsList())
  
    }, [dispatch])


        return (
            <>
                {payments && payments.map(dr=><p>{dr.rdvId} {dr.stripeId}</p>)}
                {rdvs && rdvs.map(dr=><p>{dr.isPaid} {dr.email}</p>)}
            </>
        )
    }

export default AdminScreen
