import React, {useState, useEffect, useRef} from 'react';
import  { TextField, Button, Modal, Switch } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {getAll, create, edit, delAccount} from '../../redux/actions/engage.action'
import {openSnackBar} from '../../redux/reducers/snackBar.reducer'
import Layout from '../../components/Layout'
import API from "../../redux/API";
import {isEmailValid, isPhoneValid} from '../../utils'
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Index() {
  const [open, setOpen] = useState(false);

  const [objId, setObjId] = useState('');

  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [industry_code, setIndustry_code] = useState('');
  const [agree_To_TandP, setAgree_To_TandP] = useState(false);

  const formRef = useRef();
  const userlist = useSelector((state) => state.engageState.userlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const createModal = ()=>() => {
    setObjId('')
    setEmail('');
    setAdmin(false);
    setName('');
    setPhone('');
    setIndustry_code('');
    setAgree_To_TandP(false);
    setOpen(true);
  }

  const createUser = () => async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!isEmailValid(email)){
      dispatch(openSnackBar({status: "warning", message: 'Email not valid'}));
      return;
    }
    if(!isPhoneValid(phone)){
      dispatch(openSnackBar({status: "warning", message: 'Phone not valid'}));
      return;
    }
    try {
      const formData = new FormData(formRef.current);
      formData.append('admin', admin);
      formData.append('agree_To_TandP', agree_To_TandP);
      await dispatch(create(formData));
      setOpen(false);
      dispatch( getAll() );
    } catch (err) {
        dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
    }
  }

  const editModal = (id) => () => {
    API.post("engageUsers/getUser",{id : id})
        .then((result) => {
            let data = result.data.userresult;
            if(result.data.status == 'success'){
              setObjId(data._id);
              setEmail(data.email);
              setAdmin(data.admin);
              setName(data.name);
              setPhone(data.phone);
              setIndustry_code(data.industry_code);
              setAgree_To_TandP(data.agree_To_TandP);
              setOpen(true);
            }
        }).catch((err) => {
            dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
        });
    
    setOpen(true);
  }

  const editUser = () => async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!isEmailValid(email)){
      dispatch(openSnackBar({status: "warning", message: 'Email not valid'}));
      return;
    }
    if(!isPhoneValid(phone)){
      dispatch(openSnackBar({status: "warning", message: 'Phone not valid'}));
      return;
    }
    try {
      const formData = new FormData(formRef.current);
      formData.append('id', objId);
      formData.append('admin', admin);
      formData.append('agree_To_TandP', agree_To_TandP);
      await dispatch(edit(formData));
      setOpen(false);
      dispatch( getAll() );
    } catch (err) {
        dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
    }
  }

  const deleteAccount = (id) => () => {
    dispatch(delAccount({id}));
  }

  return (
    <Layout menu_Active="2" page_title="Engage Users">
      <div className='p-[3vh] h-full'>
        <div className='text-right m-5'>
          <Button variant="outlined" onClick={createModal()}>Add User</Button>
        </div>
        <div className='h-[90%] w-full overflow-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-solid border-black border-[1px]'>
                <th className='border-solid border-black border-[1px]'>AC Account Number</th>
                <th className='border-solid border-black border-[1px]'>AC Name</th>
                <th className='border-solid border-black border-[1px]'>AC Email</th>
                <th className='border-solid border-black border-[1px]'>AC Phone</th>
                <th className='border-solid border-black border-[1px]'>AC Role</th>
                <th className='border-solid border-black border-[1px]'>AC Industry Code</th>
                <th className='border-solid border-black border-[1px]'>AC Referral Code</th>
                <th className='border-solid border-black border-[1px]'>AC Agreed To TandP</th>
                <th className='border-solid border-black border-[1px]'>Time</th>
                <th className='border-solid border-black border-[1px]'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                userlist.length > 0 && userlist.map((item, index) => (
                  <tr className='border-solid border-black border-[1px]' key={index}>
                    <td className='border-solid border-black border-[1px]'>{index+1}</td>
                    <td className='border-solid border-black border-[1px]'>{item.name}</td>
                    <td className='border-solid border-black border-[1px]'>{item.email}</td>
                    <td className='border-solid border-black border-[1px]'>{item.phone}</td>
                    <td className='border-solid border-black border-[1px]'>{item.admin?'Admin':''}</td>
                    <td className='border-solid border-black border-[1px]'>{item.industry_code}</td>
                    <td className='border-solid border-black border-[1px]'>{item.referral_code}</td>
                    <td className='border-solid border-black border-[1px]'>{item.agree_To_TandP?'Agree':''}</td>
                    <td className='border-solid border-black border-[1px]'>{item.createdAt}</td>
                    <td className='border-solid border-black border-[1px]'><Button onClick={editModal(item._id)}>Edit</Button><Button onClick={deleteAccount(item._id)}>Delete</Button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Modal
          open={open}
          onClose={() => {setOpen(false)}}
        >
          <div className='w-[70%] h-[70%] rounded-[10px] absolute top-[15%] left-[15%] bg-white p-5'>
              <div className='text-[20px] text-center p-3'>
                  {objId=='' ? 'Add User' : 'Edit User'}
              </div>
              <div className='border-[1px] border-black h-[90%] rounded-[10px] overflow-auto'>
                  <form ref={formRef} encType="multipart/form-data">
                      <div className='flex justify-center'>
                          <div className='min-w-[50%]'>
                              <div className='block m-4 justify-between grid sm:flex px-1 my-8'>
                                  <label htmlFor="AC_Email" className='mr-2'>AC_Email:</label>
                                  <input value={email} name="email" onChange={(e) => setEmail(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                              </div>
                              <div className='block m-4 justify-between grid sm:flex px-1 my-8'>
                                  <label htmlFor="AC_Role" className='mr-2'>AC_Role:</label>{console.log(admin)}
                                  <Switch {...label} checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
                                  {/* <input value={admin} name="admin"  onChange={(e) => setAdmin(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' /> */}
                              </div>
                              <div className='block m-4 justify-between grid sm:flex px-1 my-8'>
                                  <label htmlFor="AC_Name" className='mr-2'>AC_Name:</label>
                                  <input value={name} name="name"  onChange={(e) => setName(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                              </div>
                              <div className='block m-4 justify-between grid sm:flex px-1 my-8'>
                                  <label htmlFor="AC_Phone" className='mr-2'>AC_Phone:</label>
                                  <input value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                              </div>
                              <div className='block m-4 justify-between grid sm:flex px-1 my-8'>
                                  <label htmlFor="AC_Industry_Code" className='mr-2'>AC_Industry_Code:</label>
                                  <input value={industry_code} name="industry_code" onChange={(e) => setIndustry_code(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                              </div>
                              <div className='block m-4 justify-between grid sm:flex px-1 my-8'>
                                  <label htmlFor="AC_Agreed_To_TandP" className='mr-2'>AC_Agreed_To_TandP:</label>
                                  <Switch {...label} checked={agree_To_TandP} onChange={(e) => setAgree_To_TandP(e.target.checked)} />
                                  {/* <input value={agree_To_TandP} name="agree_To_TandP" onChange={(e) => setAgree_To_TandP(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' /> */}
                              </div>
                          </div>
                      </div>
                      <div className='text-center p-5'>
                          <Button variant="contained" component="label" onClick={objId == ''? createUser() : editUser()}>
                              Submit
                          </Button>
                      </div>
                  </form>
              </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
