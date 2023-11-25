import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home/Home'
import AddUser from './pages/AddUser/AddUser'
import AddBanner from './pages/AddBanner/AddBanner'
import Login from './pages/Login/Login'
import SignUp from './pages/Signup/SignUp'
import Create_Ad from './pages/Add_Ad/Add_Ad'
import Banners from './pages/Banners/Banners'
import Ads from './pages/Ads/Ads'
import AddCategory from './pages/AddCategory/AddCategory'
import Category from './pages/Category/Category'
import SideBar from "./SideBar";

const Router = () => {
  return (
    <BrowserRouter >
      <SideBar />
      <div className="app">
      <Routes>
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-banner" element={<AddBanner />} />
        <Route path="/add-ad" element={<Create_Ad />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/users" element={<Home />} />
        <Route path="/Ads" element={<Ads />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="/category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Osama" element={<Osama />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}


export default Router