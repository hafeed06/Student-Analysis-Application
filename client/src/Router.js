import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

const MainRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
            <Route exact path="/" element={<Home/>}/>
             <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    )
}

export default MainRouter