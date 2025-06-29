import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./authSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());              // Clear Redux state
    navigate("/signin");             // Redirect after logout
  }, [dispatch, navigate]);

  return null; // Or a loading spinner while redirecting
}

export default Logout;
