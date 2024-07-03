import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT,
} from './types'

export const checkauthenticated = () => async dispatch => {
    console.log('check auth called');
    if(localStorage.getItem('access')){
        const config = {
            headers :{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        };

        const body = JSON.stringify({token : localStorage.getItem('access')})
        try {
            const res = await axios.post('http://localhost:8000/auth/jwt/verify/',body,config)
            if(res.data.code !== 'token_not_valid'){
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
                console.log('token authenticated');
            }else{
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
            console.log('token auth failed');
        }
    }else{
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const load_user = ()=> async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers :{
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${localStorage.getItem('access')}`,
                'Accept' : 'application/json'
            }
        };
        try {
            const res = await axios.get('http://localhost:8000/auth/users/me/',config)
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: res.data
            })
            console.log(res.data.id);
            localStorage.setItem('userid',res.data.id)
        } catch (error) {
            dispatch({
                type: LOAD_USER_FAIL
            })
        }
    }else{
        dispatch({
            type: LOAD_USER_FAIL
        })
    }
};

export const login = (email, password)=> async dispatch => {
    const config = {
        headers :{
            'Content-Type' : 'application/json'
        }
    };
    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post('http://localhost:3000/login',body,config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        console.log(res);
        localStorage.setItem("userId", res.data.user_id)
        //dispatch(load_user());
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
        console.log(error)
    }
};

export const signup = (name, email, password, re_password)=> async dispatch => {
    const config = {
        headers :{
            'Content-Type' : 'application/json'
        }
    };
    const body = JSON.stringify({name, email, password, re_password});
    try {
        const res = await axios.post('http://localhost:8000/auth/users/',body,config)
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL
        })
        console.log(error)
    }
};

export const verify = (uid, token)=> async dispatch =>{
    const config = {
        headers :{
            'Content-Type' : 'application/json'
        }
    };
    const body = JSON.stringify({uid, token});
    try {
        await axios.post('http://localhost:8000/auth/users/activation/',body,config)
        dispatch({
            type: ACTIVATION_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: ACTIVATION_FAIL
        })
        console.log(error)
    }
}

export const reset_password = (email)=> async dispatch =>{
    const config = {
        headers :{
            'Content-Type' : 'application/json'
        }
    };

    const body = JSON.stringify({ email })
    try {
        await axios.post('http://localhost:8000/auth/users/reset_password/',body,config)
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
}

export const reset_password_confirm = (uid,token,new_pass,re_new_pass) => async dispatch =>{
    const config = {
        headers :{
            'Content-Type' : 'application/json'
        }
    };
    const body = JSON.stringify({ uid,token,new_pass,re_new_pass })
    try {
        await axios.post('http://localhost:8000/auth/users/reset_password_confirm/',body,config)
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}

export const logout = () => dispatch => {
        dispatch({
            type: LOGOUT
        })
}
