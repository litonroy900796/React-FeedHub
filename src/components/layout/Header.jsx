import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import NavigationIcon from "../../assets/icons/notification.svg";
import HomeIcon from "../../assets/icons/home.svg";
import LogOutIcon from "../../assets/icons/logout.svg";
import AvaterIcon from "../../assets/images/avatars/avater.png";

function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* <!-- Logo --> */}
        <NavLink to="/">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={Logo}
          />
        </NavLink>
        {/* <!-- nav links  --> */}

        <div className="flex items-center space-x-4">
          <NavLink to="/" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </NavLink>
          <button className="icon-btn">
            <img src={NavigationIcon} alt="Notification" />
          </button>
          <button className="icon-btn">
            <img src={LogOutIcon} alt="Logout" />
          </button>

          <button className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">Liton</span>
            <img
              className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
              src={AvaterIcon}
              alt=""
            />
          </button>
        </div>
        {/* <!-- nav links ends --> */}
      </div>
    </nav>
  );
}

export default Header;
