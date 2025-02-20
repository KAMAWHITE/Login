import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to="/" replace />; // Token bo‘lmasa, Login sahifasiga qaytariladi
    }

    return children;
};

export default ProtectedRoute;
