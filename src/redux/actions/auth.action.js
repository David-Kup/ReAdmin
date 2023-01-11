import API from "../API";
import {openSnackBar} from '../reducers/snackBar.reducer'

export function login(data, navigate) {
    return async (dispatch) => {
        API.post("users/login", data)
            .then((result) => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.setItem('user', JSON.stringify(result.data));
                localStorage.token = result.data.token;

                dispatch(setUser(result.data));
            }).catch((err) => {
                dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
            });
    }
}

export function setUser(data) {
    return { type: "setUser", data };
}

export function register(data, navigate) {
    return async (dispatch) => {
        API.post("users/register", data)
            .then((result) => {
                if(result.data.message == 'success'){
                    navigate('/');
                }else{
                    dispatch(openSnackBar({status: "warning", message: result.data.message}))
                }
            }).catch((err) => {
                dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
            });
    }
}

export function logout(navigate) {
    return async (dispatch) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(setUser(null));
        navigate('/');

    }
}
