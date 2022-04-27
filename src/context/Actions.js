//Login Start action
export const LoginStart = (userCredentials)=>({
    type:"LOGIN_START"
})

//Login Success action
export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload:token,
    // payload:token
});

//Login Failure action
export const LoginFailure = ()=>({
    type:"LOGIN_FAILURE"
});


//Update Start action
export const UpdateStart = (userCredentials)=>({
    type:"UPDATE_START"
})

//Update Success action
export const UpdateSuccess = (user)=>({
    type:"UPDATE_SUCCESS",
    payload:user
});


//Update failure action
export const UpdateFailure = ()=>({
    type:"UPDATE_FAILURE"
});

//logout action
export const Logout = ()=>({
    type:"LOGOUT"
});