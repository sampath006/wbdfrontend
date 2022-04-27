
const Reducer = (state, action)=>{
    // switch case to switch to an action
    switch(action.type){
        // login start action
        case "LOGIN_START":
            return {
                user:null,
                isFetching:true,
                error:false
            };
        
        //login success action
        case "LOGIN_SUCCESS":
            return {
                user:action.payload,
                isFetching:false,
                error:false
            };

        //login failure action
        case "LOGIN_FAILURE":
            return {
                user:null,
                isFetching:false,
                error:true
            };
        
        //logout action
        case "LOGOUT":
            return {
                user:null,
                isFetching:false,
                error:false
            };
        
        //update start action
        case "UPDATE_START":
            return {
                ...state,
                isFetching:true
            };
            
        //update success action
        case "UPDATE_SUCCESS":
            return {
                user:action.payload,
                isFetching:false,
                error:false
            };
    
        //update failure action
        case "UPDATE_FAILURE":
            return {
                user:state.user,
                isFetching:false,
                error:true
            };
            default:
                return state;
    }
}

export default Reducer;