import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Chart1 from './components/charts/Chart1'
import LoggedInOnly from './utils/LoggedInOnly'
import AddResults from './pages/AddResults'
import AuthenticationTester from './tests/AuthenticationTester'
import { useState, useEffect } from 'react'
import CheckAuth from './utils/checkAuth';




const MainRouter = () => {

    const [isAuth, setIsAuth] = useState(null)
    const [loadNavbar, setLoadNavbar] = useState(null)


    let [pages, setPages] = useState([])
    let [links, setLinks] = useState([])
    let [settings, setSettings] = useState([])

    const guestPages = ['Login', 'Signup']
    const guestLinks = ['/login', '/signup']
    const guestSettings = []


    const userPages = ['Chart Sample', 'Add Results']
    const userLinks = ['/chart', '/addresults']
    const userSettings = ['Profile', 'Account', 'Dashboard', 'Logout']

    useEffect(() => {

        const AuthResult = async () => {
            let result;
            result = await CheckAuth();
            console.log(result)
            setIsAuth(result)
        }
        AuthResult();

    }, []);

    useEffect(() => {
                    // Handling what navbar options the user will have based on authentication results 
                    if(isAuth) {
                        setPages(userPages)
                        setLinks(userLinks)
                        setSettings(userSettings)
                    }
                    else {
                        setPages(guestPages)
                        setLinks(guestLinks)
                        setSettings(guestSettings)
                    }
                    console.log("Test... ")
                    console.log(pages)
                    console.log(links)
                    console.log(settings)
                    setLoadNavbar(true)
    }, [isAuth])



    return (
        <Router>
            {loadNavbar && <Navbar pages = {pages} links = {links} settings = {settings} /> }
            <Routes>

                <Route exact path="/" element={ isAuth ? <Home /> : <Navigate to="/login" /> } />
                <Route exact path="/signup" element={<Signup />} />
                {/* Authenticated Users will be redirected to Home if they try to go to Login route  */}
                <Route exact path="/login" element={ !isAuth ? <Login /> : <Navigate to="/" /> } />
                {/* Chart is a private authenticated only route, if user is not authenticated they will be redirect to Login */}
                <Route exact path="/chart" element={isAuth? <Chart1 /> : <Navigate to="/login" />}/>
                <Route exact path="/addresults" element={< AddResults />} />
                <Route exact path="/testauth" element={<AuthenticationTester />} />

            </Routes>
        </Router>
    )
}

export default MainRouter