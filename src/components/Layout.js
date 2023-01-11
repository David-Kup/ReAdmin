import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

const Layout = (props) => {

  return (
    <div className='bg-[#2D3442] w-full grid grid-cols-5 gap-4 pt-[33px] pr-[39px] pb-[12px] h-[100vh]'>
      <div className='col-span-1'>
        <div className='h-[20vh] pb-[5vh]'>
          <img src='assets/img/adminLogo.svg' className='w-full h-full'/>
        </div>
        <div className='bg-[#FBFBFD] mt-[2vh] rounded-[25px] h-[72vh] py-[4vh] px-[1vh] sm:px-[2vh] overflow-auto'>
          <Link to="/InfoCard">
            <div className={`${props.menu_Active == 1?'menu_active' : ''} flex justify-center sm:justify-start items-center my-2 p-[5px] hover:bg-[#2d34428c] hover:rounded-[5px] hover:text-white cursor-pointer`}>
              <img src='assets/img/Logout.svg' alt='Info Cards' className='w-[35px] h-[35px]'/>
              <span className='font-["ABeeZee"] italic text-[1.1rem] ml-5 hidden sm:block'>Info Cards</span>
            </div>
          </Link>
          <Link to="/EngageUsers">
            <div className={`${props.menu_Active == 2?'menu_active' : ''} flex justify-center sm:justify-start items-center my-2 p-[5px] hover:bg-[#2d34428c] hover:rounded-[5px] hover:text-white cursor-pointer`}>
              <img src='assets/img/Chat.svg' alt='Engage Users' className='w-[35px] h-[35px]'/>
              <span className='font-["ABeeZee"] italic text-[1.1rem] ml-5 hidden sm:block'>Engage Users</span>
            </div>
          </Link>
          <Link to="/Settings">
            <div className={`${props.menu_Active == 3?'menu_active' : ''} flex justify-center sm:justify-start items-center my-2 p-[5px] hover:bg-[#2d34428c] hover:rounded-[5px] hover:text-white cursor-pointer`}>
              <img src='assets/img/Setting.svg' alt='Settings' className='w-[35px] h-[35px]'/>
              <span className='font-["ABeeZee"] italic text-[1.1rem] ml-5 hidden sm:block'>Settings</span>
            </div>
          </Link>
          <Link to="/ProfileInfo">
            <div className={`${props.menu_Active == 4?'menu_active' : ''} flex justify-center sm:justify-start items-center my-2 p-[5px] hover:bg-[#2d34428c] hover:rounded-[5px] hover:text-white cursor-pointer`}>
              <img src='assets/img/Info Circle.svg' alt='Profile info' className='w-[35px] h-[35px]'/>
              <span className='font-["ABeeZee"] italic text-[1.1rem] ml-5 hidden sm:block'>Profile info</span>
            </div>
          </Link>
          <Link to="/Downloads">
            <div className={`${props.menu_Active == 5?'menu_active' : ''} flex justify-center sm:justify-start items-center my-2 p-[5px] hover:bg-[#2d34428c] hover:rounded-[5px] hover:text-white cursor-pointer`}>
              <img src='assets/img/Down_ICON.svg' alt='Downloads' className='w-[35px] h-[35px]'/>
              <span className='font-["ABeeZee"] italic text-[1.1rem] ml-5 hidden sm:block'>Downloads</span>
            </div>
          </Link>
        </div>
      </div>
      <div className='col-span-4'>
        <div className='h-[20vh] flex items-center justify-center'>
          <p className='font-["ABeeZee"] italic text-[3rem] text-white'>{props.page_title}</p>
        </div>
        <div className='bg-[#FBFBFD] col-span-4 rounded-[25px] h-[75vh]'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
