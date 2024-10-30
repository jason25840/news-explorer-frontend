import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn }) => {
  const location = useLocation();

    if (!isLoggedIn) {
      return <Navigate to="/" replace state={{ from: location }} />; 
    }
   
    return <Outlet />
};

export default ProtectedRoute;