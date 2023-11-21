import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home/Home'
import AddUser from './pages/AddUser/AddUser'
import Login from './pages/Login/Login'
import SignUp from './pages/Signup/SignUp'

const Router = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="adduser" element={<AddUser />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}


export default Router