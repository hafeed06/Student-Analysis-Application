import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Chart1 from './components/charts/Chart1'

const MainRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
            <Route exact path="/" element={<Home/>}/>
             <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/chart" element={< Chart1 />}/>
            </Routes>
        </Router>
    )
}

export default MainRouter