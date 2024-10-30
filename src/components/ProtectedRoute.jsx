// ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, handleOpenLoginPopup }) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      handleOpenLoginPopup(); // Open login popup if not logged in
    }
    setIsCheckingAuth(false); // Mark auth check as complete
  }, [isLoggedIn, handleOpenLoginPopup]);

  if (isCheckingAuth) {
    return null; // Prevent flash during auth check
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
};

export default ProtectedRoute;