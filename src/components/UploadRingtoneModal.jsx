import React, { useEffect, useRef, useState } from "react";
import "./UploadRingtoneModal.css";

const UploadIcon = () => (
  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M8.24822 8.24807V14.2481M2.24822 9.67232C0.721924 8.11291 0.319332 5.77197 1.23697 3.79225C2.1546 1.81253 4.20114 0.606805 6.37754 0.763656C8.55395 0.920507 10.4064 2.40723 11.0307 4.49807H12.3732C13.86 4.49791 15.1717 5.47067 15.6033 6.89343C16.0349 8.31619 15.4845 9.85376 14.2482 10.6796" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M5.24821 11.248L8.24821 8.24805L11.2482 11.248" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>
);
const BlackUploadIcon = () => (
  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.24822 8.24807V14.2481M2.24822 9.67232C0.721931 8.11291 0.319339 5.77197 1.23698 3.79225C2.15461 1.81253 4.20114 0.606805 6.37755 0.763656C8.55396 0.920507 10.4064 2.40723 11.0307 4.49807H12.3732C13.86 4.49791 15.1717 5.47067 15.6033 6.89343C16.0349 8.31619 15.4846 9.85376 14.2482 10.6796" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.24823 11.248L8.24823 8.24805L11.2482 11.248" stroke="#8A7A9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

)

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5.0001C4.9999 4.6482 5.09265 4.30249 5.26888 3.99789C5.44512 3.6933 5.69861 3.44059 6.00375 3.2653C6.30889 3.09001 6.65488 2.99833 7.00679 2.99952C7.3587 3.00072 7.70406 3.09474 8.008 3.2721L20.005 10.2701C20.3078 10.4458 20.5591 10.6978 20.7339 11.0011C20.9088 11.3044 21.0009 11.6482 21.0012 11.9982C21.0015 12.3483 20.91 12.6923 20.7357 12.9958C20.5614 13.2994 20.3105 13.5519 20.008 13.7281L8.008 20.7281C7.70406 20.9055 7.3587 20.9995 7.00679 21.0007C6.65488 21.0019 6.30889 20.9102 6.00375 20.7349C5.69861 20.5596 5.44512 20.3069 5.26888 20.0023C5.09265 19.6977 4.9999 19.352 5 19.0001V5.0001Z" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M18 3H15C14.4477 3 14 3.44772 14 4V20C14 20.5523 14.4477 21 15 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M9 3H6C5.44772 3 5 3.44772 5 4V20C5 20.5523 5.44772 21 6 21H9C9.55228 21 10 20.5523 10 20V4C10 3.44772 9.55228 3 9 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 3L21 21" stroke="#FF2056" strokeWidth="2.5" strokeLinecap="round"/>
  <path d="M21 3L3 21" stroke="#FF2056" strokeWidth="2.5" strokeLinecap="round"/>
</svg>
);

const formatTime = (totalSeconds) => {
  const s = Math.max(0, Math.floor(totalSeconds || 0));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, "0")}`;
};

const MAX_DURATION_SEC = 20;

let fileIdCounter = 0;

const UploadRingtoneModal = ({ isOpen, onClose, onUpload }) => {
  const [ringtoneName, setRingtoneName] = useState("");
  const [files, setFiles] = useState([]); // { id, name, url, durationSec, currentTime, isPlaying, tooLong }
  const fileInputRef = useRef(null);
  const audioRefs = useRef({}); // id -> HTMLAudioElement

  // Reset local state whenever the modal is opened fresh.
  useEffect(() => {
    if (isOpen) {
      setRingtoneName("");
      setFiles([]);
    }
    return () => {
      Object.values(audioRefs.current).forEach((audio) => audio.pause());
      audioRefs.current = {};
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    selected.forEach((file) => {
      const id = `file-${fileIdCounter++}`;
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);

      audio.addEventListener("loadedmetadata", () => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, durationSec: audio.duration, tooLong: audio.duration > MAX_DURATION_SEC }
              : f
          )
        );
      });

      audio.addEventListener("timeupdate", () => {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, currentTime: audio.currentTime } : f))
        );
      });

      audio.addEventListener("ended", () => {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, isPlaying: false, currentTime: 0 } : f))
        );
      });

      audioRefs.current[id] = audio;

      setFiles((prev) => [
        ...prev,
        {
          id,
          name: file.name.replace(/\.[^/.]+$/, ""),
          url,
          durationSec: 0,
          currentTime: 0,
          isPlaying: false,
          tooLong: false,
        },
      ]);
    });

    // allow re-selecting the same file again later
    e.target.value = "";
  };

  const togglePreview = (id) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    const isCurrentlyPlaying = files.find((f) => f.id === id)?.isPlaying;

    // pause every other preview so only one plays at a time
    Object.entries(audioRefs.current).forEach(([otherId, otherAudio]) => {
      if (otherId !== id) otherAudio.pause();
    });
    setFiles((prev) => prev.map((f) => (f.id === id ? f : { ...f, isPlaying: false })));

    if (isCurrentlyPlaying) {
      audio.pause();
      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, isPlaying: false } : f)));
    } else {
      audio.play();
      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, isPlaying: true } : f)));
    }
  };

  const removeFile = (id) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.pause();
      delete audioRefs.current[id];
    }
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((f) => f.id !== id);
    });
  };

  const canUpload = ringtoneName.trim().length > 0 && files.length > 0 && !files.some((f) => f.tooLong);

  const handleUpload = () => {
    if (!canUpload) return;
    onUpload?.({ name: ringtoneName.trim(), files });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-header-icon">
            <UploadIcon />
          </span>
          <h2 className="modal-title">Upload Ringtone</h2>
        </div>

        <div className="modal-field">
          <label className="modal-label" htmlFor="ringtone-name">
            Ringtone Name
          </label>
          <input
            id="ringtone-name"
            type="text"
            className="modal-input"
            placeholder="e.g. Silly Horn Accent"
            value={ringtoneName}
            onChange={(e) => setRingtoneName(e.target.value)}
          />
        </div>

        <div className="modal-field">
          <label className="modal-label">Audio File</label>
          <div className="dropzone" onClick={handleDropzoneClick}>
            <span className="dropzone-icon">
              <BlackUploadIcon />
            </span>
            <span className="dropzone-text">Upload Audio File</span>
            <span className="dropzone-subtext">Length of file should be below {MAX_DURATION_SEC} sec</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </div>
        </div>

        {files.length > 0 && (
          <div className="uploaded-list">
            {files.map((file) => (
              <div className={"uploaded-item" + (file.isPlaying ? " uploaded-item-playing" : "")} key={file.id}>
                <button
                  className={"uploaded-play-button" + (file.isPlaying ? " uploaded-play-button-active" : "")}
                  onClick={() => togglePreview(file.id)}
                  aria-label={file.isPlaying ? "Pause preview" : "Play preview"}
                >
                  {file.isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>

                <div className="uploaded-info">
                  <span className="uploaded-name">{file.name}</span>
                  {file.isPlaying ? (
                    <div className="uploaded-progress">
                      <span className="uploaded-time">{formatTime(file.currentTime)}</span>
                      <div className="uploaded-progress-track">
                        <div
                          className="uploaded-progress-fill"
                          style={{
                            width: `${
                              file.durationSec ? (file.currentTime / file.durationSec) * 100 : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="uploaded-time">{formatTime(file.durationSec)} sec</span>
                    </div>
                  ) : (
                    <span className="uploaded-duration">{formatTime(file.durationSec)} sec</span>
                  )}
                  {file.tooLong && (
                    <span className="uploaded-warning">This file is longer than {MAX_DURATION_SEC} sec</span>
                  )}
                </div>

                <button
                  className="uploaded-remove"
                  onClick={() => removeFile(file.id)}
                  aria-label="Remove file"
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="modal-actions">
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

export default UploadRingtoneModal;
