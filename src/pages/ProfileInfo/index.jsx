import React, {useState, useEffect} from 'react';
import  { TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {logout} from '../../redux/actions/auth.action'
import {openSnackBar} from '../../redux/reducers/snackBar.reducer'
import Layout from '../../components/Layout'

export default function Index() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.authState.currentUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if(currentUser == null){
  //     console.log(currentUser);
  //     navigate('/');
  //   }
  // }, []);

  // const logoutclick = () => {
  //   dispatch(logout(navigate));
  // // }
  // font-family: 'ABeeZee';
  // font-style: italic;
  // font-weight: 400;
  // font-size: 18px;
  // line-height: 32px;
  // /* or 178% */
  
  
  // color: #2D3442;
  return (
    <Layout menu_Active="4" page_title="Profile Info">
      <div className='p-[2vh]'>
        ProfileInfo
      </div>
    </Layout>
  );
}
