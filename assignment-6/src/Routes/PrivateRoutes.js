import { Navigate,Outlet } from "react-router-dom";
import React from 'react'

const PrivateRoutes = () => {
    let loggin = JSON.parse(localStorage.getItem("isLogin"));
    // const Auth = loggin.some((item) => item.isLogin === true);
    // return Auth ? <Outlet /> : <Navigate to={"/login"} />;
    if(loggin){ 
        return <Outlet/>
    }else{
        return <Navigate to="/product"/>
    }
}
export default PrivateRoutes;