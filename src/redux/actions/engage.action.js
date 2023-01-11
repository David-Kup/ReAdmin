import API from "../API";
import {openSnackBar} from '../reducers/snackBar.reducer'

export function getAll() {
    return async (dispatch) => {
        API.get(`engageUsers/getalluser`)
            .then((result) => {
                if(result.data.status == 'success'){
                    dispatch( {type: "setUserlist", data: result.data.userlist} );
                }
            }).catch((err) => {
                dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
            });
    }
}

export function create(data) {
    return async (dispatch) => {
        API.post("engageUsers/create",data,{
            headers: {
                'content-type': 'multipart/form-data',
              },
        })
            .then((result) => {
                if(result.data.status == 'success'){
                    dispatch(openSnackBar({status: "success", message: 'Add success'}))
                    window.location.reload();
                }
            }).catch((err) => {
                dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
            });
    }
}

export function edit(data) {
    return async (dispatch) => {
        API.post("engageUsers/edit",data,{
            headers: {
                'content-type': 'multipart/form-data',
              },
        })
            .then((result) => {
                if(result.data.status == 'success'){
                    dispatch(openSnackBar({status: "success", message: 'Update success'}))
                }
            }).catch((err) => {
                dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
            });
    }
}


export function delAccount(data) {
    return async (dispatch) => {
        API.post("engageUsers/delAccount", data)
            .then((result) => {
                if(result.data.status == 'success'){
                    dispatch(openSnackBar({status: "success", message: 'Delete success'}))
                    window.location.reload();
                }
            }).catch((err) => {
                dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
            });
    }
}