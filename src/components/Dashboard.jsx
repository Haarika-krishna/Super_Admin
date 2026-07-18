import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const statCards = [
  {
    label: "TOTAL BUSINESS",
    value: "1,248",
    trend: "+18% this week",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 12.9993H13.0108M17.3333 6.49935V4.33268C17.3333 3.75805 17.105 3.20695 16.6987 2.80062C16.2924 2.39429 15.7413 2.16602 15.1666 2.16602H10.8333C10.2587 2.16602 9.70756 2.39429 9.30123 2.80062C8.8949 3.20695 8.66663 3.75805 8.66663 4.33268V6.49935M23.8333 14.0827C20.6188 16.2049 16.8518 17.3363 13 17.3363C9.14811 17.3363 5.3811 16.2049 2.16663 14.0827" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21.6666 6.5H4.33329C3.13668 6.5 2.16663 7.47005 2.16663 8.66667V19.5C2.16663 20.6966 3.13668 21.6667 4.33329 21.6667H21.6666C22.8632 21.6667 23.8333 20.6966 23.8333 19.5V8.66667C23.8333 7.47005 22.8632 6.5 21.6666 6.5Z" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),
  },
  {
    label: "TOTAL USERS",
    value: "12,480",
    trend: "+18% this week",
    icon: (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21.0009V19.0009C16 16.7932 14.2077 15.0009 12 15.0009H6C3.79234 15.0009 2 16.7932 2 19.0009V21.0009M16 3.12891C17.7642 3.58627 18.9962 5.17837 18.9962 7.00091C18.9962 8.82344 17.7642 10.4155 16 10.8729M22 21.0009V19.0009C21.9986 17.178 20.765 15.5866 19 15.1309" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 7C5 8.42906 5.7624 9.74957 7 10.4641C8.2376 11.1786 9.7624 11.1786 11 10.4641C12.2376 9.74957 13 8.42906 13 7C13 4.79234 11.2077 3 9 3C6.79234 3 5 4.79234 5 7H5" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    ),
  },
  {
    label: "ACTIVE ADS",
    value: "8",
    trend: "Max limit reached",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 6.00001C14.0414 6.07835 17.0139 5.08751 19.4 3.20001C19.703 2.97274 20.1084 2.93619 20.4472 3.10558C20.786 3.27497 21 3.62123 21 4.00001V16C21 16.3788 20.786 16.725 20.4472 16.8944C20.1084 17.0638 19.703 17.0273 19.4 16.8C17.0139 14.9125 14.0414 13.9217 11 14H5C3.89617 14 3 13.1038 3 12V8.00001C3 6.89618 3.89617 6.00001 5 6.00001H11" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 14C6 16.5964 6.84213 19.1228 8.4 21.2C9.0623 22.0831 10.3169 22.2623 11.2 21.6C12.0831 20.9377 12.2623 19.6831 11.6 18.8C10.5614 17.4152 10 15.731 10 14M8 6V14" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    ),
  },
];

const growthData = [
  { day: "Mon", value: 5 },
  { day: "Tue", value: 7 },
  { day: "Wed", value: 10 },
  { day: "Thu", value: 10 },
  { day: "Fri", value: 9 },
  { day: "Sat", value: 7 },
  { day: "Sun", value: 14 },
];

const todayUsers = [
  {
    sno: "01",
    name: "Venky K.",
    email: "venky@buzzsounds.com",
    phone: "+91 84569 65478",
    joined: "Oct 24, 2023",
    initials: null,
    image: "https://i.pravatar.cc/40?img=12",
    avatarColor: "#f5c6a5",
  },
  {
    sno: "02",
    name: "Alice Smith",
    email: "alice@soundart.io",
    phone: "+91 94569 65478",
    joined: "Oct 22, 2023",
    initials: "A",
    avatarColor: "#bff0d8",
  },
  {
    sno: "03",
    name: "Clara Oswald",
    email: "clara@spacetime.org",
    phone: "+91 68296 68873",
    joined: "Oct 15, 2023",
    initials: null,
    image: "https://i.pravatar.cc/40?img=47",
    avatarColor: "#f6c9d8",
  },
];

const registeredBusinesses = [
  {
    sno: "01",
    name: "Sri Krishna Hospital",
    email: "krishnahospitals@gmail.com",
    phone: "+91 84569 65478",
    joined: "Oct 24, 2023",
    initials: null,
    image: "https://i.pravatar.cc/40?img=5", 
    avatarColor: "#f5c6a5",
  },
  {
    sno: "02",
    name: "Urban Cafe",
    email: "urbancafe@soundart.io",
    phone: "+91 94569 65478",
    joined: "Oct 22, 2023",
    initials: "UC",
    avatarColor: "#c9d9fb",
  },
  {
    sno: "03",
    name: "Global Logistics",
    email: "globallogistics@spacetime.org",
    phone: "+91 68296 68873",
    joined: "Oct 15, 2023",
    initials: "GL",
    avatarColor: "#f8d49b",
  },
];

const Avatar = ({ initials, color, image, name }) => {
  if (image) {
    return <img className="table-avatar-img" src={image} alt={name} />;
  }
  return (
    <div className="table-avatar" style={{ background: color }}>
      {initials || ""}
    </div>
  );
};

// Icons for Quick Actions buttons
const PlusCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 6.00001C14.0414 6.07835 17.0139 5.08751 19.4 3.20001C19.703 2.97274 20.1084 2.93619 20.4472 3.10558C20.786 3.27497 21 3.62123 21 4.00001V16C21 16.3788 20.786 16.725 20.4472 16.8944C20.1084 17.0638 19.703 17.0273 19.4 16.8C17.0139 14.9125 14.0414 13.9217 11 14H5C3.89617 14 3 13.1038 3 12V8.00001C3 6.89618 3.89617 6.00001 5 6.00001H11" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 14C6 16.5964 6.84213 19.1228 8.4 21.2C9.0623 22.0831 10.3169 22.2623 11.2 21.6C12.0831 20.9377 12.2623 19.6831 11.6 18.8C10.5614 17.4152 10 15.731 10 14M8 6V14" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
);

const UsersIcon = () => (
  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12.6666V11.3333C10 9.86151 8.80513 8.66662 7.33335 8.66662H3.33335C1.86158 8.66662 0.666687 9.86151 0.666687 11.3333V12.6666M10 0.751953C11.1762 1.05686 11.9975 2.11827 11.9975 3.33329C11.9975 4.54831 11.1762 5.60971 10 5.91462M14 12.6666V11.3333C13.9991 10.118 13.1767 9.0571 12 8.75329" stroke="#2D1B4E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.66669 3.33268C2.66669 4.80446 3.86158 5.99935 5.33335 5.99935C6.80513 5.99935 8.00002 4.80446 8.00002 3.33268C8.00002 1.86091 6.80513 0.666016 5.33335 0.666016C3.86158 0.666016 2.66669 1.86091 2.66669 3.33268H2.66669" stroke="#2D1B4E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

);

const TrendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_976_4138)">
      <path d="M8 3.5H11V6.5" stroke="#7C3AED" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5" stroke="#7C3AED" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_976_4138">
        <rect width="12" height="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState("Week");
  const maxValue = Math.max(...growthData.map((d) => d.value));

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Stat cards — label/value/trend stacked on the left, icon on the right */}
      <div className="stat-grid">
        {statCards.map((card) => (
          <div className="stat-card" key={card.label}>
            <div className="stat-card-left">
              <span className="stat-label">{card.label}</span>
              <div className="stat-value">{card.value}</div>
              <div className="stat-trend"><TrendIcon /> {card.trend}</div>
            </div>
            <span className="stat-icon-wrap">{card.icon}</span>
          </div>
        ))}
      </div>

      {/* Usage & Growth + Quick Actions */}
      <div className="mid-grid">
        <div className="panel growth-panel">
          <div className="panel-header">
            <h2 className="panel-title">Usage &amp; Growth</h2>
          </div>
          <div className="growth-section">
          <div className="growth-subheader">
            <span className="growth-subtitle">User Growth</span>
            <select
              className="growth-select"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <option>Week</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>
          <div className="growth-chart">
            {growthData.map((d) => (
              <div className="growth-bar-col" key={d.day}>
                <span className="growth-bar-value">{d.value}</span>
                <div
                  className="growth-bar"
                  style={{ height: `${(d.value / maxValue) * 100}%` }}
                />
                <span className="growth-bar-day">{d.day}</span>
              </div>
            ))}
          </div>
          </div>
        </div>

        <div className="panel actions-panel">
          <h2 className="actions-title">Quick Actions</h2>
          <div className="actions-buttons">
            <button className="btn btn-primary" onClick={() => navigate("/ringtone")}>
              <PlusCircleIcon /> Add Ringtone
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/ads")}>
              <MegaphoneIcon /> Create Ad
            </button>
            <button className="btn btn-ghost" onClick={() => navigate("/users")}>
              <UsersIcon /> View Users
            </button>
          </div>
        </div>
      </div>

      {/* Today User table */}
      <div className="panel table-panel">
        <div className="panel-header">
          <h2 className="panel-title">Today User</h2>
          <a className="view-all" href="#!">
            View All
          </a>
        </div>
        <DataTable
          rows={todayUsers}
          columns={["S.NO", "PROFILE", "NAME", "EMAIL", "PHONE NUMBER", "JOINED"]}
        />
      </div>

      {/* Registered Business table */}
      <div className="panel table-panel">
        <div className="panel-header">
          <h2 className="panel-title">Registered Business</h2>
          <a className="view-all" href="#!">
            View All
          </a>
        </div>
        <DataTable
          rows={registeredBusinesses}
          columns={["S.NO", "PROFILE", "BUSINESS NAME", "EMAIL", "PHONE NUMBER", "JOINED", ""]}
          showView
        />
      </div>
    </div>
  );
};

const DataTable = ({ rows, columns, showView }) => (
  <table className="data-table">
    <thead>
      <tr>
        {columns.map((c) => (
          <th key={c}>{c}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.sno}>
          <td>{row.sno}</td>
          <td>
            <Avatar initials={row.initials} color={row.avatarColor} image={row.image} name={row.name} />
          </td>
          <td className="cell-name">{row.name}</td>
          <td className="cell-muted">{row.email}</td>
          <td className="cell-muted">{row.phone}</td>
          <td className="cell-muted">{row.joined}</td>
          {showView && (
            <td>
              <a className="view-link" href="#!">
                View
              </a>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Dashboard;
