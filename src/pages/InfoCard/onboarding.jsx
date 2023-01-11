import React, {useState, useRef} from 'react';
import  { Button, Modal} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {getAll, create, edit} from '../../redux/actions/infocard.action'
import {openSnackBar} from '../../redux/reducers/snackBar.reducer'
import API from "../../redux/API";
import {IMG_URL} from "../../config/constants"

export default function Onboarding(props) {

    const [open, setOpen] = useState(false);
    const [objId, setObjId] = useState('');

    const [showOrder, setShowOrder] = useState('');
    const [bt1Show, setBt1Show] = useState('');
    const [bt2Show, setBt2Show] = useState('');
    const [bodyTitle, setBodyTitle] = useState('');
    const [bodyDesc, setBodyDesc] = useState('');
    const [cardPacket, setCardPacket] = useState(1);
    const [userFr, setUserFr] = useState('');
    const [bt1Link, setBt1Link] = useState('');
    const [bt2Link, setBt2Link] = useState('');

    const [showImg, setShowImg] = useState('');
    const formRef = useRef();
    const dispatch = useDispatch();

    const createModal = ()=>() => {
        setObjId('')
        setShowOrder('');
        setBt1Show('');
        setBt2Show('');
        setBodyTitle('');
        setBodyDesc('');
        setUserFr('');
        setBt1Link('');
        setBt2Link('');
        setShowImg('');
        setOpen(true);
    }

    const createinfo = () => async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const formData = new FormData(formRef.current);
            await dispatch(create(formData));
            setOpen(false);
            dispatch( getAll(props.value) );
        } catch (err) {
            dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
        }
    }

    const editModal = (id) => () => {
        API.post("infocard/getInfocard",{id : id})
            .then((result) => {
                let data = result.data.Infocardresult;
                if(result.data.status == 'success'){
                    setObjId(data._id);
                    setShowOrder(data.Info_Card_Show_order);
                    setBt1Show(data.Info_Card_BT_1_Show);
                    setBt2Show(data.Info_Card_BT_2_Show);
                    setBodyTitle(data.Body_Title);
                    setBodyDesc(data.Body_Description);
                    setCardPacket(data.Info_Card_Packet);
                    setUserFr(data.Info_Card_Used_Fr);
                    setBt1Link(data.Info_Card_BT_1_Link_to);
                    setBt2Link(data.Info_Card_BT_2_Link_to);
                    setShowImg(IMG_URL+data.Info_Card_Logo);
                    setOpen(true);
                }
            }).catch((err) => {
                dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
            });
        
        setOpen(true);
    }

    const editinfo = () => async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const formData = new FormData(formRef.current);
            formData.append('id', objId);
            await dispatch(edit(formData));
            setOpen(false);
            dispatch( getAll(props.value) );
        } catch (err) {
            dispatch(openSnackBar({status: "warning", message: JSON.parse(err.request.response).message}))
        }
    }


    const handleChange = () => (e) => {
        setShowImg(URL.createObjectURL(e.target.files[0]));
    }

  return (
    <div className='h-full'>
        <div className='text-right p-2'>
            <Button variant="outlined" onClick={createModal()}>Add</Button>
        </div>
        <div className='h-full w-full overflow-auto'>
            <table className='w-full'>
            <thead>
                <tr className='border-solid border-black border-[1px]'>
                <th className='border-solid border-black border-[1px]'>Info Card ID</th>
                <th className='border-solid border-black border-[1px]'>Info Card Packet</th>
                <th className='border-solid border-black border-[1px] w-[2px]'>Info Card Show order</th>
                <th className='border-solid border-black border-[1px]'>Info Card Used Fr</th>
                <th className='border-solid border-black border-[1px]'>Info Card Logo</th>
                <th className='border-solid border-black border-[1px]'>Info Card BT 1 Show</th>
                <th className='border-solid border-black border-[1px]'>Info Card BT 1 Link to</th>
                <th className='border-solid border-black border-[1px]'>Info Card BT 2 Show</th>
                <th className='border-solid border-black border-[1px]'>Info Card BT 2 Link to</th>
                <th className='border-solid border-black border-[1px]'>Body Title</th>
                <th className='border-solid border-black border-[1px]'>Body Description</th>
                {/* <th className='border-solid border-black border-[1px]'>Action</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    props.infocardlist.map((item, index) => (
                        <tr className='border-solid border-black border-[1px] cursor-pointer hover:bg-[#2d34428c] hover:text-white' key = {index} onClick={editModal(item._id)}>
                            <td className='border-solid border-black border-[1px]'>{index+1}</td>
                            <td className='border-solid border-black border-[1px]'>{item.Info_Card_Packet}</td>
                            <td className='border-solid border-black border-[1px] w-[2px]'>{item.Info_Card_Show_order}</td>
                            <td className='border-solid border-black border-[1px]'>{item.Info_Card_Used_Fr}</td>
                            <td className='border-solid border-black border-[1px] flex justify-center items-center w-max'><img src={IMG_URL+item.Info_Card_Logo} className='h-[100px] w-[100px]'/></td>
                            <td className='border-solid border-black border-[1px]'>{item.Info_Card_BT_1_Show}</td>
                            <td className='border-solid border-black border-[1px]'>{item.Info_Card_BT_1_Link_to}</td>
                            <td className='border-solid border-black border-[1px]'>{item.Info_Card_BT_2_Show}</td>
                            <td className='border-solid border-black border-[1px]'>{item.Info_Card_BT_2_Link_to}</td>
                            <td className='border-solid border-black border-[1px]'>{item.Body_Title}</td>
                            <td className='border-solid border-black border-[1px]'>{item.Body_Description}</td>
                            {/* <td className='border-solid border-black border-[1px]'><button onClick={editModal(item._id)}>edit</button></td> */}
                        </tr>
                    ))
                }
            </tbody>
            </table>
            <Modal
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <div className='w-[70%] h-[70%] rounded-[10px] absolute top-[15%] left-[15%] bg-white p-5'>
                    <div className='text-[20px] text-center p-3'>
                        {objId=='' ? 'Create Info cards' : 'Edit Info cards'}
                    </div>
                    <div className='border-[1px] border-black h-[90%] rounded-[10px] overflow-auto'>
                        <form ref={formRef} encType="multipart/form-data">
                            <div className='grid grid-cols-2 md:grid-flow-row'>
                                <div className='col-span-2 md:col-span-1'>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8'>
                                        <label htmlFor="Show Order" className='mr-2'>Show Order:</label>
                                        <input value={showOrder} name="showOrder"  onChange={(e) => setShowOrder(e.target.value)} type="number" className='rounded-[5px] border-[1px] border-black p-2' />
                                    </div>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8'>
                                        <label htmlFor="Bt_1_show" className='mr-2'>Bt_1_show:</label>
                                        <input value={bt1Show} name="bt1Show"  onChange={(e) => setBt1Show(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                                    </div>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8'>
                                        <label htmlFor="Bt_2_show" className='mr-2'>Bt_2_show:</label>
                                        <input value={bt2Show} name="bt2Show" onChange={(e) => setBt2Show(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                                    </div>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8'>
                                        <label htmlFor="Body Title" className='mr-2'>Body Title:</label>
                                        <input value={bodyTitle} name="bodyTitle" onChange={(e) => setBodyTitle(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                                    </div>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8'>
                                        <label htmlFor="Body Description" className='mr-2'>Body Description:</label>
                                        <input value={bodyDesc} name="bodyDesc" onChange={(e) => setBodyDesc(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                                    </div>
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8 hidden'>
                                        <label htmlFor="Card Packet" className='mr-2'>Card Packet:</label>
                                        <input value={cardPacket} name="cardPacket" type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                                    </div>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8'>
                                        <label htmlFor="Used Fr" className='mr-2'>Used Fr:</label>
                                        <input value={userFr} name="userFr" onChange={(e) => setUserFr(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                                    </div>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8'>
                                        <label htmlFor="Bt_1_link" className='mr-2'>Bt_1_link:</label>
                                        <input value={bt1Link} name="bt1Link" onChange={(e) => setBt1Link(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                                    </div>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8'>
                                        <label htmlFor="Bt_2_link" className='mr-2'>Bt_2_link:</label>
                                        <input value={bt2Link} name="bt2Link" onChange={(e) => setBt2Link(e.target.value)} type="text" className='rounded-[5px] border-[1px] border-black p-2' />
                                    </div>
                                    <div className='block m-4 justify-center sm:justify-between grid sm:flex px-1 my-8'>
                                        <Button variant="contained" component="label">
                                            Upload
                                            <input hidden accept="image/*" name="recite" type="file" onChange={handleChange()}/>
                                        </Button>
                                        <div className='border-[1px] rounded-[5px] border-black p-1 w-[100px] h-[100px]'>
                                            <img src={showImg} className='w-full h-full'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center p-5'>
                                <Button variant="contained" component="label" onClick={objId == ''? createinfo() : editinfo()}>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
  );
}
