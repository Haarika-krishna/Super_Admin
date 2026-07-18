import React from "react";
import "./Reports.css";

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M16 21V19C16 16.7923 14.2077 15 12 15H6C3.79234 15 2 16.7923 2 19V21M16 3.12799C17.7642 3.58536 18.9962 5.17746 18.9962 6.99999C18.9962 8.82252 17.7642 10.4146 16 10.872M22 21V19C21.9986 17.1771 20.765 15.5857 19 15.13" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M5 7C5 8.42906 5.7624 9.74957 7 10.4641C8.2376 11.1786 9.7624 11.1786 11 10.4641C12.2376 9.74957 13 8.42906 13 7C13 4.79234 11.2077 3 9 3C6.79234 3 5 4.79234 5 7H5" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const BusinessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12H12.01M16 6V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V6M22 13C19.0328 14.959 15.5555 16.0033 12 16.0033C8.44445 16.0033 4.96721 14.959 2 13" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 6H4C2.89543 6 2 6.89543 2 8V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6Z" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const AdsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11 6.00001C14.0414 6.07835 17.0139 5.08751 19.4 3.20001C19.703 2.97274 20.1084 2.93619 20.4472 3.10558C20.786 3.27497 21 3.62123 21 4.00001V16C21 16.3788 20.786 16.725 20.4472 16.8944C20.1084 17.0638 19.703 17.0273 19.4 16.8C17.0139 14.9125 14.0414 13.9217 11 14H5C3.89617 14 3 13.1038 3 12V8.00001C3 6.89618 3.89617 6.00001 5 6.00001H11" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M6 14C6 16.5964 6.84213 19.1228 8.4 21.2C9.0623 22.0831 10.3169 22.2623 11.2 21.6C12.0831 20.9377 12.2623 19.6831 11.6 18.8C10.5614 17.4152 10 15.731 10 14M8 6V14" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 8.75V1.75" stroke="#7C3AED" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75" stroke="#7C3AED" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4.08398 5.83331L7.00065 8.74998L9.91732 5.83331" stroke="#7C3AED" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const reportCards = [
  {
    id: "users-report",
    icon: <UsersIcon />,
    title: "Users Reports",
    subtitle: "Registrations, Activity, Status",
  },
  {
    id: "business-report",
    icon: <BusinessIcon />,
    title: "Business Report",
    subtitle: "No Of Registrations",
  },
  {
    id: "ads-report",
    icon: <AdsIcon />,
    title: "Ad's Report",
    subtitle: "Views, Clicks, CTR Percentage",
  },
];

const Reports = () => {
  const handleDownload = (report) => {
    // hook up your real export/download API call here
    console.log("Download Excel for:", report.title);
  };

  return (
    <div className="reports-page">
      <h1 className="reports-title">Reports</h1>

      <div className="reports-grid">
        {reportCards.map((report) => (
          <div className="report-card" key={report.id}>
            <div className="report-icon-wrap">{report.icon}</div>
            <h3 className="report-title">{report.title}</h3>
            <p className="report-subtitle">{report.subtitle}</p>
            <button className="report-download-button" onClick={() => handleDownload(report)}>
              <DownloadIcon />
              Download Excel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
