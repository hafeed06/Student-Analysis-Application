import Chart1 from './components/charts/Chart1';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MainRouter from './Router';
import { useRecoilState } from "recoil";
import {useState, useEffect} from 'react'
import CheckAuth from './utils/checkAuth';

function App() {

  return (
    <div className="App" >
      <MainRouter />
    </div>
  );
}

export default App;
