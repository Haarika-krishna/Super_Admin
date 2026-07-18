import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// Simple inline icons so this component has zero external icon dependency.
// Swap these for lucide-react / react-icons later if you prefer.
const icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2.25H6.75C7.16394 2.25 7.5 2.58606 7.5 3V8.25C7.5 8.66394 7.16394 9 6.75 9H3C2.58606 9 2.25 8.66394 2.25 8.25V3C2.25 2.58606 2.58606 2.25 3 2.25V2.25" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.25 2.25H15C15.4139 2.25 15.75 2.58606 15.75 3V5.25C15.75 5.66394 15.4139 6 15 6H11.25C10.8361 6 10.5 5.66394 10.5 5.25V3C10.5 2.58606 10.8361 2.25 11.25 2.25V2.25" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.25 9H15C15.4139 9 15.75 9.33606 15.75 9.75V15C15.75 15.4139 15.4139 15.75 15 15.75H11.25C10.8361 15.75 10.5 15.4139 10.5 15V9.75C10.5 9.33606 10.8361 9 11.25 9V9" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 12H6.75C7.16394 12 7.5 12.3361 7.5 12.75V15C7.5 15.4139 7.16394 15.75 6.75 15.75H3C2.58606 15.75 2.25 15.4139 2.25 15V12.75C2.25 12.3361 2.58606 12 3 12V12" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15.75V14.25C12 12.5943 10.6557 11.25 9 11.25H4.5C2.84425 11.25 1.5 12.5943 1.5 14.25V15.75M12 2.34601C13.3232 2.68903 14.2471 3.88311 14.2471 5.25001C14.2471 6.61691 13.3232 7.81098 12 8.15401M16.5 15.75V14.25C16.499 12.8828 15.5737 11.6893 14.25 11.3475" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.75 5.25C3.75 6.90575 5.09425 8.25 6.75 8.25C8.40575 8.25 9.75 6.90575 9.75 5.25C9.75 3.59425 8.40575 2.25 6.75 2.25C5.09425 2.25 3.75 3.59425 3.75 5.25V5.25" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  ),
  business: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.99984 9.99999H10.0082M13.3332 4.99999V3.33332C13.3332 2.8913 13.1576 2.46737 12.845 2.15481C12.5325 1.84225 12.1085 1.66666 11.6665 1.66666H8.33317C7.89114 1.66666 7.46722 1.84225 7.15466 2.15481C6.8421 2.46737 6.6665 2.8913 6.6665 3.33332V4.99999M18.3332 10.8333C15.8605 12.4658 12.9628 13.3361 9.99984 13.3361C7.03688 13.3361 4.13918 12.4658 1.6665 10.8333" stroke="#8A7A9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.6665 5H3.33317C2.4127 5 1.6665 5.74619 1.6665 6.66667V15C1.6665 15.9205 2.4127 16.6667 3.33317 16.6667H16.6665C17.587 16.6667 18.3332 15.9205 18.3332 15V6.66667C18.3332 5.74619 17.587 5 16.6665 5Z" stroke="#8A7A9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  ),
  ringtone: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.75 13.5V3.75L15.75 2.25V12" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.25 13.5C2.25 14.7418 3.25819 15.75 4.5 15.75C5.74181 15.75 6.75 14.7418 6.75 13.5C6.75 12.2582 5.74181 11.25 4.5 11.25C3.25819 11.25 2.25 12.2582 2.25 13.5H2.25" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.25 12C11.25 13.2418 12.2582 14.25 13.5 14.25C14.7418 14.25 15.75 13.2418 15.75 12C15.75 10.7582 14.7418 9.75 13.5 9.75C12.2582 9.75 11.25 10.7582 11.25 12V12" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  ),
  ads: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.25 4.5C10.531 4.55876 12.7604 3.81563 14.55 2.4C14.7773 2.22956 15.0813 2.20214 15.3354 2.32918C15.5895 2.45623 15.75 2.71593 15.75 3V12C15.75 12.2841 15.5895 12.5438 15.3354 12.6708C15.0813 12.7979 14.7773 12.7705 14.55 12.6C12.7604 11.1844 10.531 10.4412 8.25 10.5H3.75C2.92213 10.5 2.25 9.82788 2.25 9V6C2.25 5.17213 2.92213 4.5 3.75 4.5H8.25" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.5 10.5C4.5 12.4473 5.1316 14.3421 6.3 15.9C6.79706 16.5627 7.73726 16.6971 8.4 16.2C9.06274 15.7029 9.19706 14.7627 8.7 14.1C7.92107 13.0614 7.5 11.7982 7.5 10.5M6 4.5V10.5" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  ),
  reports: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.25 2.25V15.75H15.75M13.5 12.75V6.75M9.75 12.75V3.75M6 12.75V10.5" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.25339 3.10199C7.33902 2.20112 8.09559 1.51306 9.00051 1.51306C9.90544 1.51306 10.662 2.20112 10.7476 3.10199C10.798 3.67195 11.1231 4.18155 11.6187 4.4675C12.1143 4.75345 12.7182 4.77985 13.2369 4.53824C14.0591 4.16496 15.0303 4.47647 15.482 5.25832C15.9337 6.04017 15.7185 7.03718 14.9844 7.56299C14.5162 7.89153 14.2374 8.42763 14.2374 8.99962C14.2374 9.5716 14.5162 10.1077 14.9844 10.4362C15.7185 10.9621 15.9337 11.9591 15.482 12.7409C15.0303 13.5228 14.0591 13.8343 13.2369 13.461C12.7182 13.2194 12.1143 13.2458 11.6187 13.5317C11.1231 13.8177 10.798 14.3273 10.7476 14.8972C10.662 15.7981 9.90544 16.4862 9.00051 16.4862C8.09559 16.4862 7.33902 15.7981 7.25339 14.8972C7.20307 14.3271 6.87788 13.8173 6.38206 13.5313C5.88625 13.2453 5.28213 13.2191 4.76339 13.461C3.9412 13.8343 2.96995 13.5228 2.51825 12.7409C2.06655 11.9591 2.28183 10.9621 3.01589 10.4362C3.48411 10.1077 3.76285 9.5716 3.76285 8.99962C3.76285 8.42763 3.48411 7.89153 3.01589 7.56299C2.2829 7.03694 2.06819 6.04083 2.51938 5.25953C2.97057 4.47822 3.94065 4.16631 4.76264 4.53824C5.28131 4.77985 5.88519 4.75345 6.38079 4.4675C6.87639 4.18155 7.20148 3.67195 7.25189 3.10199" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.75 9C6.75 10.2418 7.75819 11.25 9 11.25C10.2418 11.25 11.25 10.2418 11.25 9C11.25 7.75819 10.2418 6.75 9 6.75C7.75819 6.75 6.75 7.75819 6.75 9V9" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  ),
};

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: icons.dashboard },
  { label: "Users", path: "/users", icon: icons.users },
  { label: "Business", path: "/business", icon: icons.business },
  { label: "Whistlez Ringtone", path: "/ringtone", icon: icons.ringtone },
  { label: "Ads", path: "/ads", icon: icons.ads },
  { label: "Reports", path: "/reports", icon: icons.reports },
  { label: "Settings", path: "/settings", icon: icons.settings },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          {menuItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " sidebar-link-active" : "")
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
