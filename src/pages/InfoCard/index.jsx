import React, {useState, useLayoutEffect, useEffect} from 'react';
import  { TextField, Button, Modal, Box, Tab } from '@material-ui/core'
import  { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {getAll, create, edit} from '../../redux/actions/infocard.action'
import {openSnackBar} from '../../redux/reducers/snackBar.reducer'
import Layout from '../../components/Layout'
import Onboarding from './onboarding'
import SignInUp from './signInUp'

export default function Index() {

  const [value, setValue] = React.useState('1');
  const [open, setOpen] = useState(false);
  const infocardlist = useSelector((state) => state.infocardState.infocardlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll(value));
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(getAll(newValue));
  };

  return (
    <Layout menu_Active="1" page_title="Info Cards">
      <div className='p-[3vh] h-full'>
        
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Onboarding" value="1" />
              <Tab label="SignIn/Up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" className='h-[83%]'>
            <Onboarding value={value} infocardlist={infocardlist} />
          </TabPanel>
          <TabPanel value="2">
            <SignInUp value={value} infocardlist={infocardlist} />
          </TabPanel>
        </TabContext>
        
      </div>
    </Layout>
  );
}
