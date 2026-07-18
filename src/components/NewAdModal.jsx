import React, { useEffect, useRef, useState } from "react";
import "./NewAdModal.css";

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="#6d28d9" strokeWidth="1.6" />
    <circle cx="8.5" cy="10" r="1.5" fill="#6d28d9" />
    <path d="M3 16l5-5 4 4 3-3 6 6" fill="none" stroke="#6d28d9" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14">
    <path d="M6 6l12 12M18 6L6 18" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" width="14" height="14">
    <path d="M6 9l6 6 6-6" fill="none" stroke="#6b6478" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RECOMMENDED_SIZE = "250x120 px";

const positionOptions = ["Home Page 1", "Home Page 2", "Receive Whistle", "Business Profile"];

const NewAdModal = ({ isOpen, onClose, onUpload }) => {
  const [adName, setAdName] = useState("");
  const [adPosition, setAdPosition] = useState(positionOptions[0]);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [mediaFile, setMediaFile] = useState(null); // { file, previewUrl }
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setAdName("");
      setAdPosition(positionOptions[0]);
      setRedirectUrl("");
      setMediaFile(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile({ file, previewUrl: URL.createObjectURL(file) });
    e.target.value = "";
  };

  const handleRemoveMedia = () => {
    if (mediaFile) URL.revokeObjectURL(mediaFile.previewUrl);
    setMediaFile(null);
  };

  const canUpload = adName.trim().length > 0 && redirectUrl.trim().length > 0 && !!mediaFile;

  const handleUpload = () => {
    if (!canUpload) return;
    onUpload?.({
      name: adName.trim(),
      position: adPosition,
      redirectUrl: redirectUrl.trim(),
      mediaFile: mediaFile.file,
    });
    onClose();
  };

  return (
    <div className="ad-modal-backdrop" onClick={onClose}>
      <div className="ad-modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="ad-modal-title">New Ad/Campaign</h2>

        <div className="ad-modal-field">
          <label className="ad-modal-label" htmlFor="ad-name">
            Ad Name
          </label>
          <input
            id="ad-name"
            type="text"
            className="ad-modal-input"
            value={adName}
            onChange={(e) => setAdName(e.target.value)}
          />
        </div>

        <div className="ad-modal-field">
          <label className="ad-modal-label" htmlFor="ad-position">
            Ad Position
          </label>
          <div className="ad-select-wrap">
            <select
              id="ad-position"
              className="ad-modal-select"
              value={adPosition}
              onChange={(e) => setAdPosition(e.target.value)}
            >
              {positionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="ad-select-chevron">
              <ChevronDown />
            </span>
          </div>
        </div>

        <div className="ad-modal-field">
          <label className="ad-modal-label">Media File</label>

          {!mediaFile ? (
            <div className="ad-dropzone" onClick={handleDropzoneClick}>
              <span className="ad-dropzone-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3H19C20.1038 3 21 3.89617 21 5V19C21 20.1038 20.1038 21 19 21H5C3.89617 21 3 20.1038 3 19V5C3 3.89617 3.89617 3 5 3V3" stroke="#8A7A9E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 9C7 10.1038 7.89617 11 9 11C10.1038 11 11 10.1038 11 9C11 7.89617 10.1038 7 9 7C7.89617 7 7 7.89617 7 9V9" stroke="#8A7A9E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 15.0002L17.914 11.9142C17.133 11.1334 15.867 11.1334 15.086 11.9142L6 21.0002" stroke="#8A7A9E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              </span>
              <span className="ad-dropzone-text">Upload PNG/JPEG File</span>
              <span className="ad-dropzone-subtext">Recommended Size: {RECOMMENDED_SIZE}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="ad-media-preview-wrap">
              <img className="ad-media-preview" src={mediaFile.previewUrl} alt="Ad media preview" />
              <button className="ad-media-remove" onClick={handleRemoveMedia} aria-label="Remove media file">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="#FF2056" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 6L18 18" stroke="#FF2056" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="ad-modal-field">
          <label className="ad-modal-label" htmlFor="redirect-url">
            Redirect URL
          </label>
          <input
            id="redirect-url"
            type="text"
            className="ad-modal-input"
            placeholder="https://example.com"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
          />
        </div>

        <div className="ad-modal-actions">
          <button className="btn btn-plain" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleUpload} disabled={!canUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAdModal;
