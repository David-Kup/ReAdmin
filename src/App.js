import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { Routes, Route,  Navigate } from 'react-router-dom';
import InfoCard from './pages/InfoCard';
import EngageUsers from './pages/EngageUsers';
import Settings from './pages/Settings';
import ProfileInfo from './pages/ProfileInfo';
import Downloads from './pages/Downloads';
import {setUser} from './redux/actions/auth.action'
import './App.css';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.token || sessionStorage.token;

    useEffect(() => {
        if (token !== undefined) {
            if (token.length > 9) {
                dispatch(setUser(localStorage.user));
            }
        }
    }, [token, dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" element ={<Navigate to = "/InfoCard"/>} />
        <Route exact path = "/InfoCard" element = {<InfoCard />} />
        <Route exact path = "/EngageUsers" element = {<EngageUsers />} />
        <Route exact path = "/Settings" element = {<Settings />} />
        <Route exact path = "/ProfileInfo" element = {<ProfileInfo />} />
        <Route exact path = "/Downloads" element = {<Downloads />} />
        <Route path = '/*' element={ <Navigate replace to ="/"/> }/>
      </Routes>
    </div>
  );
}

export default App;
