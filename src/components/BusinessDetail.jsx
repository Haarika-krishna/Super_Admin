import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessDetail.css";

const businessInfo = {
  name: "Sri Krishna Hospital",
  verified: true,
  category: "Healthcare",
  location: "Hyderabad, India",
  coverImage:
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
};

const stats = [
  { label: "Avg. Daily Volume", value: "2,450" },
  { label: "Active Tokens", value: "432" },
  { label: "Completed Tokens", value: "234" },
  { label: "Missed Tokens", value: "70" },
];

const contactInfo = {
  address: "123 Health Ave, Outer Ring Road, Bangalore, 560103",
  phone: "+91 80 4567 8900",
  email: "admin@skhospital.com",
  website: "www.skhospital.com",
};

const queueSettings = [
  { label: "Max Capacity", value: "500 Patients/Day" },
  { label: "Wait Interval", value: "~12 Minutes" },
  { label: "Auto-Assign Logic", value: "Priority First" },
];

const tokenAnalytics = [
  { day: "Mon", value: 30 },
  { day: "Tue", value: 50 },
  { day: "Wed", value: 40 },
  { day: "Thu", value: 82 },
  { day: "Fri", value: 55 },
  { day: "Sat", value: 25 },
  { day: "Sun", value: 60 },
];

const TokenAnalyticsIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <rect x="3" y="10" width="4" height="10" rx="1.5" fill="#4C1D95" />
    <rect x="10" y="4" width="4" height="16" rx="1.5" fill="#7C3AED" />
    <rect x="17" y="7" width="4" height="13" rx="1.5" fill="#A78BFA" />
  </svg>
);

const operatingHours = [
  { days: "Monday - Friday", hours: "08:00 AM - 10:00PM" },
  { days: "Saturday", hours: "09:00 AM - 08:00 PM" },
  { days: "Sunday", hours: "24 Hours Emergency" },
];

const serviceDetails = [
  "Emergency Care",
  "OPD",
  "Diagnostics",
  "Pharmacy",
  "Physiotherapy",
  "Vaccination",
];

// New — Peak Hours panel data
const peakHours = [
  { range: "10:00 AM - 12:00 PM", level: "High", percent: 90 },
  { range: "04:00 PM - 06:00 PM", level: "Medium", percent: 55 },
];

const IconWrap = ({ children }) => <span className="section-icon">{children}</span>;

const BusinessDetail = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    // hook up your update API call here
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleDeactivate = () => {
    // hook up your deactivate API call / confirmation modal here
    console.log("Deactivate business:", businessInfo.name);
  };

  const maxAnalyticsValue = Math.max(...tokenAnalytics.map((d) => d.value));

  return (
    <div className="business-detail-page">
      <button className="back-link" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {businessInfo.name}
      </button>

      {/* Cover image with overlay title */}
      <div className="cover-card">
        <img className="cover-image" src={businessInfo.coverImage} alt={businessInfo.name} />
        <div className="cover-overlay">
          <div className="cover-name-row">
            <h1 className="cover-name">{businessInfo.name}</h1>
            {businessInfo.verified && (
              <svg className="verified-badge" viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 2l2.4 2.2 3.2-.4 1 3 2.9 1.5-.6 3.2 1.6 2.9-2.2 2.4.4 3.2-3 1-1.5 2.9-3.2-.6-2.9 1.6-2.4-2.2-3.2.4-1-3-2.9-1.5.6-3.2L1.9 12l2.2-2.4-.4-3.2 3-1 1.5-2.9 3.2.6L12 2z"
                  fill="#3b82f6"
                />
                <path
                  d="M8.5 12.5l2.2 2.2 4.3-4.8"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className="cover-meta">
            <span className="cover-meta-item">
              <IconWrap>
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path d="M4 8h16v11H4V8zm4-4h8v4H8V4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </IconWrap>
              {businessInfo.category}
            </span>
            <span className="cover-meta-item">
              <IconWrap>
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path
                    d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </IconWrap>
              {businessInfo.location}
            </span>
          </div>
        </div>
      </div>

      {/* Stat row */}
      <div className="stat-row">
        {stats.map((stat) => (
          <div className="stat-box" key={stat.label}>
            <span className="stat-box-label">{stat.label}</span>
            <span className="stat-box-value">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* All 6 panels — Contact Info, Queue Settings, Token Analytics, Operating Hours,
          Service Details, Peak Hours — in one 3-column grid (2 rows of 3) */}
      <div className="detail-grid">
        <div className="detail-panel">
          <h2 className="panel-title">
            <IconWrap>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12C8.55 12 9.02083 11.8042 9.4125 11.4125C9.80417 11.0208 10 10.55 10 10C10 9.45 9.80417 8.97917 9.4125 8.5875C9.02083 8.19583 8.55 8 8 8C7.45 8 6.97917 8.19583 6.5875 8.5875C6.19583 8.97917 6 9.45 6 10C6 10.55 6.19583 11.0208 6.5875 11.4125C6.97917 11.8042 7.45 12 8 12ZM4 16H12V15.425C12 15.025 11.8917 14.6583 11.675 14.325C11.4583 13.9917 11.1583 13.7417 10.775 13.575C10.3417 13.3917 9.89583 13.25 9.4375 13.15C8.97917 13.05 8.5 13 8 13C7.5 13 7.02083 13.05 6.5625 13.15C6.10417 13.25 5.65833 13.3917 5.225 13.575C4.84167 13.7417 4.54167 13.9917 4.325 14.325C4.10833 14.6583 4 15.025 4 15.425V16ZM14 20H2C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20ZM14 18V6.85L9.15 2H2V18H14ZM2 18V2V6.85V18Z" fill="#4648D4"/>
              </svg>

            </IconWrap>
            Contact Information
          </h2>
          <div className="info-field">
            <span className="info-label">Address</span>
            <span className="info-value">{contactInfo.address}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Phone</span>
            <span className="info-value">{contactInfo.phone}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Email</span>
            <span className="info-value">{contactInfo.email}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Website</span>
            <span className="info-value info-link">{contactInfo.website}</span>
          </div>
        </div>

        <div className="detail-panel">
          <h2 className="panel-title">
            <IconWrap>
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M16.675 7L15.575 4.6L13.175 3.5L15.575 2.4L16.675 0L17.775 2.4L20.175 3.5L17.775 4.6L16.675 7ZM18.675 14L17.875 12.3L16.175 11.5L17.875 10.7L18.675 9L19.475 10.7L21.175 11.5L19.475 12.3L18.675 14ZM5.675 20L5.375 17.65C5.25833 17.6 5.13333 17.5333 5 17.45C4.86667 17.3667 4.75833 17.2833 4.675 17.2L2.475 18.15L0 13.8L1.875 12.4C1.875 12.2667 1.875 12.1333 1.875 12C1.875 11.8667 1.875 11.7333 1.875 11.6L0 10.2L2.475 5.85L4.675 6.8C4.75833 6.71667 4.86667 6.63333 5 6.55C5.13333 6.46667 5.25833 6.4 5.375 6.35L5.675 4H10.675L10.975 6.35C11.0917 6.4 11.2167 6.46667 11.35 6.55C11.4833 6.63333 11.5917 6.71667 11.675 6.8L13.875 5.85L16.35 10.2L14.475 11.6C14.475 11.7333 14.475 11.8667 14.475 12C14.475 12.1333 14.475 12.2667 14.475 12.4L16.35 13.8L13.875 18.15L11.675 17.2C11.5917 17.2833 11.4833 17.3667 11.35 17.45C11.2167 17.5333 11.0917 17.6 10.975 17.65L10.675 20H5.675ZM8.175 15C9.00833 15 9.71667 14.7083 10.3 14.125C10.8833 13.5417 11.175 12.8333 11.175 12C11.175 11.1667 10.8833 10.4583 10.3 9.875C9.71667 9.29167 9.00833 9 8.175 9C7.34167 9 6.63333 9.29167 6.05 9.875C5.46667 10.4583 5.175 11.1667 5.175 12C5.175 12.8333 5.46667 13.5417 6.05 14.125C6.63333 14.7083 7.34167 15 8.175 15ZM7.425 18H8.925L9.125 16.2C9.60833 16.0667 10.0208 15.8958 10.3625 15.6875C10.7042 15.4792 11.0417 15.2 11.375 14.85L13.025 15.6L13.725 14.35L12.275 13.25C12.4083 12.8667 12.475 12.45 12.475 12C12.475 11.55 12.4083 11.1333 12.275 10.75L13.725 9.65L13.025 8.4L11.375 9.15C11.0417 8.8 10.7042 8.52083 10.3625 8.3125C10.0208 8.10417 9.60833 7.93333 9.125 7.8L8.925 6H7.425L7.225 7.8C6.74167 7.93333 6.32917 8.10417 5.9875 8.3125C5.64583 8.52083 5.30833 8.8 4.975 9.15L3.325 8.4L2.625 9.65L4.075 10.75C3.94167 11.1333 3.87083 11.55 3.8625 12C3.85417 12.45 3.925 12.8667 4.075 13.25L2.625 14.35L3.325 15.6L4.975 14.85C5.30833 15.2 5.64583 15.4792 5.9875 15.6875C6.32917 15.8958 6.74167 16.0667 7.225 16.2L7.425 18Z" fill="#4648D4"/>
              </svg>

            </IconWrap>
            Queue Settings
          </h2>
          {queueSettings.map((setting) => (
            <div className="queue-field" key={setting.label}>
              <div>
                <span className="info-label">{setting.label}</span>
                <div className="info-val">{setting.value}</div>
              </div>
              <span className="queue-field-icon">›</span>
            </div>
          ))}
        </div>

        <div className="detail-panel">
          <h2 className="panel-title">
            <IconWrap>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 16V9H16V16H12ZM6 16V0H10V16H6ZM0 16V5H4V16H0Z" fill="#4648D4"/>
              </svg>

            </IconWrap>
            Token Analytics
          </h2>
          <div className="analytics-chart">
            {tokenAnalytics.map((d) => (
              <div className="analytics-bar-col" key={d.day}>
                <div
                  className="analytics-bar"
                  style={{ height: `${(d.value / maxAnalyticsValue) * 100}%` }}
                />
                <span className="analytics-bar-day">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-panel">
          <h2 className="panel-title">
            <IconWrap>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z" fill="#4648D4"/>
              </svg>

            </IconWrap>
            Operating Hours
          </h2>
          {operatingHours.map((row) => (
            <div className="hours-row" key={row.days}>
              <span className="hours-days">{row.days}</span>
              <span className="hours-time">{row.hours}</span>
            </div>
          ))}
        </div>

        <div className="detail-panel">
          <h2 className="panel-title">
            <IconWrap>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 13C13.1667 13 12.4583 12.7083 11.875 12.125C11.2917 11.5417 11 10.8333 11 10C11 9.16667 11.2917 8.45833 11.875 7.875C12.4583 7.29167 13.1667 7 14 7C14.8333 7 15.5417 7.29167 16.125 7.875C16.7083 8.45833 17 9.16667 17 10C17 10.8333 16.7083 11.5417 16.125 12.125C15.5417 12.7083 14.8333 13 14 13ZM14 11C14.2833 11 14.5208 10.9042 14.7125 10.7125C14.9042 10.5208 15 10.2833 15 10C15 9.71667 14.9042 9.47917 14.7125 9.2875C14.5208 9.09583 14.2833 9 14 9C13.7167 9 13.4792 9.09583 13.2875 9.2875C13.0958 9.47917 13 9.71667 13 10C13 10.2833 13.0958 10.5208 13.2875 10.7125C13.4792 10.9042 13.7167 11 14 11ZM8 20V17.1C8 16.75 8.08333 16.4208 8.25 16.1125C8.41667 15.8042 8.65 15.5583 8.95 15.375C9.48333 15.0583 10.0458 14.7958 10.6375 14.5875C11.2292 14.3792 11.8333 14.225 12.45 14.125L14 16L15.55 14.125C16.1667 14.225 16.7667 14.3792 17.35 14.5875C17.9333 14.7958 18.4917 15.0583 19.025 15.375C19.325 15.5583 19.5625 15.8042 19.7375 16.1125C19.9125 16.4208 20 16.75 20 17.1V20H8ZM9.975 18H13.05L11.7 16.35C11.4 16.4333 11.1083 16.5417 10.825 16.675C10.5417 16.8083 10.2583 16.95 9.975 17.1V18ZM14.95 18H18V17.1C17.7333 16.9333 17.4583 16.7875 17.175 16.6625C16.8917 16.5375 16.6 16.4333 16.3 16.35L14.95 18ZM2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V7C17.7333 6.66667 17.4417 6.35 17.125 6.05C16.8083 5.75 16.4333 5.55 16 5.45V2H2V16H6.15C6.1 16.1833 6.0625 16.3667 6.0375 16.55C6.0125 16.7333 6 16.9167 6 17.1V18H2ZM4 6H11C11.4333 5.66667 11.9083 5.41667 12.425 5.25C12.9417 5.08333 13.4667 5 14 5V4H4V6ZM4 10H9C9 9.65 9.0375 9.30833 9.1125 8.975C9.1875 8.64167 9.29167 8.31667 9.425 8H4V10ZM4 14H7.45C7.63333 13.85 7.82917 13.7167 8.0375 13.6C8.24583 13.4833 8.45833 13.375 8.675 13.275V12H4V14ZM2 16V2V5.425C2 5.29167 2 5.1875 2 5.1125C2 5.0375 2 5 2 5C2 5 2 5.4875 2 6.4625C2 7.4375 2 8.61667 2 10C2 10.4667 2 10.9333 2 11.4C2 11.8667 2 12.3333 2 12.8C2 12.9333 2 13.075 2 13.225C2 13.375 2 13.5167 2 13.65C2 14.0333 2 14.425 2 14.825C2 15.225 2 15.6167 2 16Z" fill="#4648D4"/>
              </svg>

            </IconWrap>
            Service Details
          </h2>
          <div className="service-tags">
            {serviceDetails.map((service) => (
              <span className="service-tag" key={service}>
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* New — Peak Hours panel */}
        {/* <div className="detail-panel">
          <h2 className="panel-title">
            <IconWrap>
              <svg viewBox="0 0 24 24" width="16" height="16">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconWrap>
            Peak Hours
          </h2>
          {peakHours.map((peak) => (
            <div className="peak-row" key={peak.range}>
              <div className="peak-row-top">
                <span className="peak-range">{peak.range}</span>
                <span className={"peak-level peak-level-" + peak.level.toLowerCase()}>{peak.level}</span>
              </div>
              <div className="peak-track">
                <div className="peak-fill" style={{ width: `${peak.percent}%` }} />
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Footer actions */}
      <div className="detail-footer">
        <button className="butn deactivate-business-btn" onClick={handleDeactivate}>
          <svg viewBox="0 0 24 24" width="15" height="15">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <line x1="7" y1="7" x2="17" y2="17" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Deactivate Business
        </button>

        <div className="detail-footer-right">
          <button className="butn btn-plain" onClick={handleCancel}>
            Cancel
          </button>
          <button className="butn btn-primary" onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
