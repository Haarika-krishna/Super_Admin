import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessUsers.css";

// Sample data — replace with your API response.
const businessData = [
  {
    id: 1,
    name: "Sri Krishna Hospital",
    logo: "https://i.pravatar.cc/48?img=5",
    owner: "Dr. Rahul Sharma",
    domain: "Healthcare",
    location: "Hyderabad, TS",
    registered: "Oct 12, 2023",
  },
  {
    id: 2,
    name: "Nexus Logistics",
    logo: "https://i.pravatar.cc/48?img=6",
    owner: "Sarah Jenkins",
    domain: "Supply Chain",
    location: "Hyderabad, TS",
    registered: "Jan 04, 2024",
  },
  {
    id: 3,
    name: "Evergreen Finance",
    logo: "https://i.pravatar.cc/48?img=7",
    owner: "Mark Thompson",
    domain: "Fintech",
    location: "Hyderabad, TS",
    registered: "Nov 30, 2022",
  },
  {
    id: 4,
    name: "Aura Tech Solutions",
    logo: "https://i.pravatar.cc/48?img=8",
    owner: "Chen Wei",
    domain: "Software",
    location: "Hyderabad, TS",
    registered: "Feb 22, 2024",
  },
];

const TOTAL_PAGES = 4;

const BusinessCard = ({ business, onViewProfile, onManage }) => (
  <div className="business-card">
    <div className="business-card-header">
      <img className="business-logo" src={business.logo} alt={business.name} />
      <h3 className="business-name">{business.name}</h3>
    </div>

    <div className="business-details">
      <div className="business-detail-row">
        <span className="detail-label">Owner</span>
        <span className="detail-value">{business.owner}</span>
      </div>
      <div className="business-detail-row">
        <span className="detail-label">Domain</span>
        <span className="detail-value">{business.domain}</span>
      </div>
      <div className="business-detail-row">
        <span className="detail-label">Location</span>
        <span className="detail-value">{business.location}</span>
      </div>
      <div className="business-detail-row">
        <span className="detail-label">Registered</span>
        <span className="detail-value">{business.registered}</span>
      </div>
    </div>

    <div className="business-actions">
      <button className="btn btn-outline" onClick={() => onViewProfile(business)}>
        View Profile
      </button>
      <button className="btn btn-primary" onClick={() => onManage(business)}>
        Manage
      </button>
    </div>
  </div>
);

const BusinessUsers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("Joined Date");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBusinesses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return businessData;
    return businessData.filter(
      (b) => b.name.toLowerCase().includes(q) || b.owner.toLowerCase().includes(q)
    );
  }, [search]);

  const goToPage = (page) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setCurrentPage(page);
  };

  const handleViewProfile = (business) => {
    // hook up navigation / modal here
     navigate(`/business/${business.id}`);
  };

  const handleManage = (business) => {
    // hook up navigation / modal here
    console.log("Manage:", business.name);
  };

  return (
    <div className="business-users-page">
      <h1 className="business-users-title">Business Users</h1>

      <div className="business-users-panel">
        <div className="business-toolbar">
          <div className="business-search">
            <svg className="business-search-icon" viewBox="0 0 24 24" width="16" height="16">
              <circle cx="11" cy="11" r="6" fill="none" stroke="#9791a3" strokeWidth="1.8" />
              <line x1="16" y1="16" x2="21" y2="21" stroke="#9791a3" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="business-filter">
            <span className="business-filter-label">Filter by</span>
            <select
              className="business-filter-select"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option>Joined Date</option>
              <option>Name</option>
              <option>Domain</option>
            </select>
          </div>
        </div>

        <div className="business-grid">
          {filteredBusinesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              onViewProfile={handleViewProfile}
              onManage={handleManage}
            />
          ))}
        </div>

        <div className="business-pagination">
          <button
            className="page-arrow"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={"page-number" + (page === currentPage ? " page-number-active" : "")}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="page-arrow"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === TOTAL_PAGES}
            aria-label="Next page"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessUsers;
