import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedUser: (() => {
        try {
          return JSON.parse(localStorage.getItem('logged_user') || '');
        } catch {
          return null;
        }
    })(),
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        initiateLogin: (state)=>{
            state.isLoading = true;
            state.error = false;
        },
        loginSuccessful:(state, action)=>{
            state.loggedUser = action.payload;
            state.isLoading = false;
            state.error = null;   
            localStorage.setItem('logged_user', JSON.stringify(state.loggedUser));         
        },
        loginFailed: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        },
        updateUser(state, action) {
            state.loggedUser = {
                ...state.loggedUser,
                name: action.payload.name !== undefined ? action.payload.name : state.loggedUser.name,
                number: action.payload.number !== undefined ? action.payload.number : state.loggedUser.number,
                email: action.payload.email !== undefined ? action.payload.email : state.loggedUser.email
            }
            localStorage.setItem('logged_user', JSON.stringify(state.loggedUser));
        },
        setLoading: (state) => {
            state.isLoading = false;
            state.error = null;  
        },
        setError: (state,action) => {
            state.isLoading = false;
            state.error = action.payload;  
        },
        logout:(state)=>{
            state.loggedUser = null;
            localStorage.removeItem('logged_user');
            localStorage.removeItem('auth_token');
            
        },
    }
})

export const {initiateLogin, loginSuccessful, loginFailed, updateUser, logout, setLoading, setError} = userSlice.actions;

export default userSlice.reducer;