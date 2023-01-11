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

  return (
    <Layout menu_Active="3" page_title="Recite Pages Settings">
      <div className='p-[3vh] h-full'>
        <div className='text-right'>
          <button className='border-solid border-[#2d3442] border-[1px] bg-[#2d3442] text-white rounded-[10px] m-[12px] py-[5px] px-[10px]'>create</button>
        </div>
        <div className=' overflow-auto'>
          <table className='max-w-full'>
            <tr className='border-solid border-black border-[1px]'>
              <th className='border-solid border-black border-[1px]'>PageId</th>
              <th className='border-solid border-black border-[1px]'>Page Logo</th>
              <th className='border-solid border-black border-[1px]'>Title</th>
              <th className='border-solid border-black border-[1px]'>Description </th>
              <th className='border-solid border-black border-[1px]'>HTML</th>
              <th className='border-solid border-black border-[1px]'>Last Updated</th>
              <th className='border-solid border-black border-[1px]'>Count_Time_Opened (on render Count ++)</th>
            </tr>
            {/* {
              infocardlist.map((item, index) => { */}
                <tr className='border-solid border-black border-[1px]'>
                  <td className='border-solid border-black border-[1px]'>1</td>
                  <td className='border-solid border-black border-[1px]'>fdsa</td>
                  <td className='border-solid border-black border-[1px]'>fdsa</td>
                  <td className='border-solid border-black border-[1px]'>fds</td>
                  <td className='border-solid border-black border-[1px]'>fdsa</td>
                  <td className='border-solid border-black border-[1px]'>fdsa</td>
                  <td className='border-solid border-black border-[1px]'>fdsa</td>
                </tr>
              {/* })
            } */}
          </table>
        </div>
      </div>
    </Layout>
  );
}
