import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Chart1 from './components/charts/Chart1'
import LoggedInOnly from './pages/LoggedInOnly'
import AddResults from './pages/AddResults'
import AuthenticationTester from './tests/AuthenticationTester'
import { useState, useEffect } from 'react'
import CheckAuth from './utils/checkAuth';




const MainRouter = () => {

    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {

        const AuthResult = async () => {
            let result;
            result = await CheckAuth();
            console.log(result)
            setIsAuth(result)
        }
        AuthResult();

    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
                {isAuth && <Route exact path="/chart" element={< Chart1 />} /> }
                <Route exact path="/loggedtest" element={< LoggedInOnly />} />
                <Route exact path="/addresults" element={< AddResults />} />
                <Route exact path="/testauth" element={<AuthenticationTester />} />

            </Routes>
        </Router>
    )
}

export default MainRouter