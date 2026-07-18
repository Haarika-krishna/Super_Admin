import React, { useState } from "react";
import NewAdModal from "./NewAdModal";
import "./Ads.css";

// Sample data — replace with your API response.
const initialAds = [
  {
    id: "fest-banner",
    title: "Fest Banner",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
    status: "running",
    startDate: "Oct 01, 2023",
    position: "Home",
    views: "124,000",
    clicks: "6,200",
    ctr: "5.0%",
  },
  {
    id: "beauty-products",
    title: "Beauty Products",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop",
    status: "running",
    startDate: "Oct 01, 2023",
    position: "Home",
    views: "124,000",
    clicks: "6,200",
    ctr: "5.0%",
  },
  {
    id: "upgrade-ad",
    title: "Upgrade Ad",
    image: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?q=80&w=600&auto=format&fit=crop",
    status: "paused",
    startDate: "Oct 01, 2023",
    position: "Receive Whistle",
    views: "84,500",
    clicks: "2,100",
    ctr: "2.5%",
  },
  {
    id: "food-restaurant",
    title: "Food Restaurant",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop",
    status: "paused",
    startDate: "Oct 01, 2023",
    position: "Receive Whistle",
    views: "84,500",
    clicks: "2,100",
    ctr: "2.5%",
  },
];

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
   <g clip-path="url(#clip0_1_9098)">
     <path d="M12.3508 3.97367C12.9926 3.33202 12.9928 2.29002 12.3511 1.64821C11.7095 1.0064 10.6675 1.00627 10.0257 1.64792L2.24048 9.43483C2.10505 9.56987 2.00488 9.73614 1.94882 9.919L1.17823 12.4577C1.14752 12.5604 1.1757 12.6718 1.25162 12.7476C1.32753 12.8234 1.43892 12.8514 1.54165 12.8205L4.0809 12.0505C4.26358 11.9949 4.42984 11.8954 4.56507 11.7606L12.3508 3.97367" stroke="#8A7A9E" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
   </g>
   <defs>
    <clipPath id="clip0_1_9098">
     <rect width="14" height="14" fill="white"/>
    </clipPath>
   </defs>
  </svg>

);

const PlayIcon = () => (
  <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M0.585938 1.75203C0.585877 1.54675 0.639981 1.34509 0.742786 1.16741C0.845592 0.989731 0.99346 0.84232 1.17146 0.740065C1.34946 0.637811 1.55129 0.584332 1.75656 0.585029C1.96184 0.585726 2.1633 0.640574 2.3406 0.744034L9.33885 4.8262C9.51547 4.92868 9.66209 5.07572 9.76407 5.25262C9.86605 5.42952 9.91982 5.63009 9.91999 5.83428C9.92017 6.03847 9.86675 6.23913 9.76508 6.41621C9.66341 6.59329 9.51704 6.74058 9.3406 6.84337L2.3406 10.9267C2.1633 11.0302 1.96184 11.085 1.75656 11.0857C1.55129 11.0864 1.34946 11.0329 1.17146 10.9307C0.99346 10.8284 0.845592 10.681 0.742786 10.5033C0.639981 10.3256 0.585877 10.124 0.585938 9.9187V1.75203Z" stroke="#8A7A9E" stroke-width="1.17" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.74935 1.75H10.4993C10.8213 1.75 11.0827 2.01138 11.0827 2.33333V11.6667C11.0827 11.9886 10.8213 12.25 10.4993 12.25H8.74935C8.4274 12.25 8.16602 11.9886 8.16602 11.6667V2.33333C8.16602 2.01138 8.4274 1.75 8.74935 1.75V1.75" stroke="#009966" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.49935 1.75H5.24935C5.5713 1.75 5.83268 2.01138 5.83268 2.33333V11.6667C5.83268 11.9886 5.5713 12.25 5.24935 12.25H3.49935C3.1774 12.25 2.91602 11.9886 2.91602 11.6667V2.33333C2.91602 2.01138 3.1774 1.75 3.49935 1.75V1.75" stroke="#009966" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M9.91732 2.91668V11.0833C9.91732 11.7272 9.39455 12.25 8.75065 12.25H2.91732C2.27342 12.25 1.75065 11.7272 1.75065 11.0833V2.91668M0.583984 2.91668H11.084M3.50065 2.91668V1.75001C3.50065 1.10611 4.02342 0.583344 4.66732 0.583344H7.00065C7.64455 0.583344 8.16732 1.10611 8.16732 1.75001V2.91668" stroke="#FF2056" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

);

const AdCard = ({ ad, onToggleStatus, onEdit, onDelete }) => {
  const isRunning = ad.status === "running";

  return (
    <div className="ad-card">
      <div className="ad-card-top">
        <div className="ad-image-wrap">
          <img className="ad-image" src={ad.image} alt={ad.title} />
          <span className="ad-preview-label">Ad Preview</span>
        </div>

        {/* Badge + icons sit beside the image, in the empty space — not overlaid on it */}
        <div className="ad-card-top-right">
          <span className={"ad-status-badge" + (isRunning ? " ad-status-running" : " ad-status-paused")}>
            {isRunning ? "Running" : "Paused"}
          </span>

          <div className="ad-image-actions">
            <button className="ad-icon-button" onClick={() => onEdit(ad)} aria-label="Edit ad">
              <EditIcon />
            </button>
            <button
              className="ad-icon-button"
              onClick={() => onToggleStatus(ad.id)}
              aria-label={isRunning ? "Pause ad" : "Resume ad"}
            >
              {isRunning ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="ad-icon-button ad-icon-danger" onClick={() => onDelete(ad)} aria-label="Delete ad">
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="ad-body">
        <h3 className="ad-title">{ad.title}</h3>
        <p className="ad-meta">
          Starts: <span className="ad-meta-strong">{ad.startDate}</span> • Position:{" "}
          <span className="ad-meta-link">{ad.position}</span>
        </p>

        <div className="ad-metrics">
          <span className="ad-metrics-label">Performance Metrics</span>
          <div className="ad-metrics-values">
            <div className="ad-metric">
              <span className="ad-metric-label">VIEWS</span>
              <span className="ad-metric-value">{ad.views}</span>
            </div>
            <div className="ad-metric">
              <span className="ad-metric-label">CLICKS</span>
              <span className="ad-metric-value">{ad.clicks}</span>
            </div>
            <div className="ad-metric ad-metric-ctr">
              <span className="ad-metric-label-ctr">CTR</span>
              <span className="ad-metric-value">{ad.ctr}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Ads = () => {
  const [ads, setAds] = useState(initialAds);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const runningCount = ads.filter((ad) => ad.status === "running").length;

  const handleToggleStatus = (id) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id ? { ...ad, status: ad.status === "running" ? "paused" : "running" } : ad
      )
    );
  };

  const handleEdit = (ad) => {
    // hook up your edit modal / route here
    console.log("Edit ad:", ad.title);
  };

  const handleDelete = (ad) => {
   setAds((prev) => prev.filter((a) => a.id !== ad.id));
  };

  const handleAddCampaign = () => {
    
    setIsModalOpen(true);
  };
  const handleNewAdUpload = ({ name, position, redirectUrl, mediaFile }) => {
    const newAd = {
      id: `ad-${Date.now()}`,
      title: name,
      image: URL.createObjectURL(mediaFile),
      status: "running",
      startDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      position,
      views: "0",
      clicks: "0",
      ctr: "0.0%",
    };
    setAds((prev) => [newAd, ...prev]);
  };

  return (
    <div className="ads-page">
      <div className="ads-header">
        <h1 className="ads-title">Active Ads</h1>
        <button className="add-campaign-button" onClick={handleAddCampaign}>
          Add New Campaign
        </button>
      </div>

      <p className="ads-subtitle">
        Total running campaigns : <span className="ads-subtitle-strong">{runningCount}</span>
      </p>

      <div className="ads-grid">
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <NewAdModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpload={handleNewAdUpload}
      />
    </div>
  );
};

export default Ads;
