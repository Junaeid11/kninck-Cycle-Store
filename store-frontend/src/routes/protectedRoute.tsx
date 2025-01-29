/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { currentToken } from "../redux/services/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoute = ({children}: {children: ReactNode}) => {

const token = useAppSelector(currentToken);
if(!token){
    return <Navigate to="/login" replace={true} />
}


  return children;
}

export default ProtectedRoute
