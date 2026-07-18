import React from "react";
import "./Navbar.css";

const Navbar = ({ adminName = "Admin Profile", adminEmail = "admin@vixly.com" }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo-icon">🐦</span>
        <span className="navbar-logo-text">Whistlez</span>
      </div>

      <div className="navbar-right">
        <button className="navbar-bell" aria-label="Notifications">
          <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.20047 15C6.46843 15.4641 6.9636 15.7499 7.49947 15.7499C8.03534 15.7499 8.53051 15.4641 8.79847 15M0.945967 10.7445C0.745783 10.9639 0.693934 11.2808 0.813746 11.5525C0.933559 11.8243 1.20246 11.9998 1.49947 12H13.4995C13.7964 12.0001 14.0655 11.825 14.1856 11.5534C14.3058 11.2818 14.2543 10.9649 14.0545 10.7452C13.057 9.717 11.9995 8.62425 11.9995 5.25C11.9995 2.76638 9.98308 0.75 7.49947 0.75C5.01585 0.75 2.99947 2.76638 2.99947 5.25C2.99947 8.62425 1.94122 9.717 0.945967 10.7445" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <span className="navbar-bell-dot" />
        </button>

        <div className="navbar-profile">
          <div className="navbar-profile-text">
            <span className="navbar-profile-name">{adminName}</span>
            <span className="navbar-profile-email">{adminEmail}</span>
          </div>
          <div className="navbar-avatar">A</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
