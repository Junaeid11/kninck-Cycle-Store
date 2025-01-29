import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


export type TUser ={
    userId: string,
    role: string,
    iat: number,
    exp: number
}



type TAuthState ={
    user:null | object,
    token:null | string,
}

const initialState: TAuthState = {
    user:null,
    token:null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser : (state, action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout : (state)=>{
            state.user = null;
            state.token = null;
        }
         
    }
})

export const {setUser, logout}= authSlice.actions;

export default authSlice.reducer;
export const currentToken = (state:RootState) => state.auth.token
export const selectCurrentUser = (state:RootState) => state.auth.user