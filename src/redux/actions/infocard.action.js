import API from "../API";
import {openSnackBar} from '../reducers/snackBar.reducer'

export function getAll(data) {
    return async (dispatch) => {
        API.get(`infocard/getallinfo?packet=${data}`)
            .then((result) => {
                if(result.data.status == 'success'){
                    dispatch( {type: "setInfocardAll", data: result.data.Infocardlist} );
                }
            }).catch((err) => {
                dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
            });
    }
}

export function create(data) {
    return async (dispatch) => {
        API.post("infocard/create",data,{
            headers: {
                'content-type': 'multipart/form-data',
              },
        })
            .then((result) => {
                if(result.data.status == 'success'){
                    dispatch(openSnackBar({status: "success", message: 'Add success'}))
                }
            }).catch((err) => {
                dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
            });
    }
}

export function edit(data) {
    return async (dispatch) => {
        API.post("infocard/edit",data,{
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