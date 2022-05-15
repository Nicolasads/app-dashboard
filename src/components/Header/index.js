import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/box.png";
import { logout } from "../../features/slicer/appSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-between">
      <img
        src={Logo}
        className="img mx-3"
        alt="logo"
        style={{ width: "50px", height: "50px" }}
      />

      <button
        className="btn btn-primary pull-right"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </nav>
  );
}

export default Header;
