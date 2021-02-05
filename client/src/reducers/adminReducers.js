import { ADMIN_USER_LIST_FAIL, ADMIN_USER_LIST_REQUEST, ADMIN_USER_LIST_SUCCESS,
         ADMIN_DR_LIST_FAIL, ADMIN_DR_LIST_REQUEST, ADMIN_DR_LIST_SUCCESS,
         ADMIN_RDV_LIST_FAIL, ADMIN_RDV_LIST_REQUEST, ADMIN_RDV_LIST_SUCCESS,
         ADMIN_PAYMENT_LIST_FAIL, ADMIN_PAYMENT_LIST_REQUEST, ADMIN_PAYMENT_LIST_SUCCESS } from "../constants/adminConstants";

export const adminListUsersReducer = (state={users:[]},action)=>{
    switch(action.type){
        case ADMIN_USER_LIST_REQUEST:
            return{
                loading:true,
            };
        case ADMIN_USER_LIST_SUCCESS:
            return{
                loading:false,
                users:action.payload
            };
        case ADMIN_USER_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            };
            
            default:
                return state;
    }
}

export const adminListDrsReducer = (state={drs:[]},action)=>{
    switch(action.type){
        case ADMIN_DR_LIST_REQUEST:
            return{
                loading:true,
            };
        case ADMIN_DR_LIST_SUCCESS:
            return{
                loading:false,
                drs:action.payload
            };
        case ADMIN_DR_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            };
            
            default:
                return state;
    }
}

export const adminListRdvsReducer = (state={rdvs:[]},action)=>{
    switch(action.type){
        case ADMIN_RDV_LIST_REQUEST:
            return{
                loading:true,
            };
        case ADMIN_RDV_LIST_SUCCESS:
            return{
                loading:false,
                rdvs:action.payload
            };
        case ADMIN_RDV_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            };
            
            default:
                return state;
    }
}

export const adminListPaymentsReducer = (state={payments:[]},action)=>{
    switch(action.type){
        case ADMIN_PAYMENT_LIST_REQUEST:
            return{
                loading:true,
            };
        case ADMIN_PAYMENT_LIST_SUCCESS:
            return{
                loading:false,
                payments:action.payload
            };
        case ADMIN_PAYMENT_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            };
            
            default:
                return state;
    }
}