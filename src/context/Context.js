import {createContext, useEffect, useReducer} from "react"
import Reducer from "./Reducer";


//Initial state of the user
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null || JSON.parse(localStorage.getItem("admin")),
    isFetching: false,
    error: false
};

//creating a context
export const Context = createContext(INITIAL_STATE)

//providing a context
export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    //fetches the user details
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));
    },[state.user])

    return (
        // returns the state of the  user
        <Context.Provider value = {{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
        }}>{children}</Context.Provider>
    )
}