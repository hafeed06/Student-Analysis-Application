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
import UserInfoTester from './tests/UserInfoTester'
import HomePieChart from './components/charts/HomePieChart'
import AddCourse from './pages/AddCourse'
import AddCourseType from './pages/AddCourseType'
import AddSemester from './pages/AddSemester'
import AddEvaluation from './pages/AddEvaluation'




const MainRouter = () => {

    const [isAuth, setIsAuth] = useState(null)
    const [loadNavbar, setLoadNavbar] = useState(null)


    let [pages, setPages] = useState([])
    let [links, setLinks] = useState([])
    let [settings, setSettings] = useState([])

    const guestPages = ['Login', 'Signup']
    const guestLinks = ['/login', '/signup']
    const guestSettings = []


    const userPages = ['Performance Metrics', 'Add Results', 'Add Course', 'Add Course Type', 'Add Semester', 'Add Evaluation']
    const userLinks = ['/chart', '/addresults', '/addCourse', '/addCourseType', '/addSemester', '/addEvaluation']
    const userSettings = ['Profile', 'Account', 'Dashboard', 'Logout']

    useEffect(() => {

        const AuthResult = async () => {
            let result;
            result = await CheckAuth();
            console.log(result)
            setIsAuth(result)
        }
        AuthResult();
        console.log("Router useEffect 1 Re-Rendered")

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
            {loadNavbar && <Navbar pages = {pages} links = {links} settings = {settings} isAuth = {isAuth} /> }
            <Routes>

                <Route exact path="/" element={ isAuth ? <Home /> : <Navigate to="/login" /> } />
                <Route exact path="/signup" element={<Signup />} />
                {/* Authenticated Users will be redirected to Home if they try to go to Login route  */}
                <Route exact path="/login" element={ !isAuth ? <Login /> : <Navigate to="/" /> } />
                {/* Chart is a private authenticated only route, if user is not authenticated they will be redirect to Login */}
                <Route exact path="/chart" element={isAuth? <Chart1 /> : <Navigate to="/login" />}/>
                <Route exact path="/addResults" element={isAuth? <AddResults /> : <Navigate to="/login" />}/>
                <Route exact path="/addCourse" element={isAuth? <AddCourse /> : <Navigate to="/login" />}/>
                <Route exact path="/addCourseType" element={isAuth? <AddCourseType /> : <Navigate to="/login" />}/>
                <Route exact path="/addSemester" element={isAuth? <AddSemester /> : <Navigate to="/login" />}/>
                <Route exact path="/addEvaluation" element={isAuth? <AddEvaluation /> : <Navigate to="/login" />}/>
            
                { /* Test Routes */ }
                <Route exact path="/testauth" element={<AuthenticationTester />} />
                <Route exact path="/testinfo" element={<UserInfoTester />} />
                <Route exact path="/testpie" element={<HomePieChart /> } /> 


            </Routes>
        </Router>
    )
}

export default MainRouter