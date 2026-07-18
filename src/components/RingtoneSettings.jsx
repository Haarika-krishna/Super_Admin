import React, { useEffect, useRef, useState } from "react";
import UploadRingtoneModal from "./UploadRingtoneModal";
import "./RingtoneSettings.css";

const initialRingtones = [
  {
    id: "bell-classic",
    name: "Bell Classic",
    isDefault: true,
    durationLabel: "0:15 sec",
    durationSec: 15,
    active: true,
    src: "/sounds/3d_bell.mp3",
  },
  {
    id: "synth-wave",
    name: "Synth Wave Ring",
    isDefault: false,
    durationLabel: "0:28 sec",
    durationSec: 28,
    active: false,
    src: "/sounds/bells.mp3",
  },
  {
    id: "chiptune-laugh",
    name: "Chiptune Laugh",
    isDefault: false,
    durationLabel: "0:08 sec",
    durationSec: 8,
    active: false,
    src: "/sounds/3d_bell.mp3",
  },
  {
    id: "corporate-ring",
    name: "Corporate Ring",
    isDefault: false,
    durationLabel: "0:30 sec",
    durationSec: 30,
    active: false,
    src: "/sounds/bells.mp3",
  },
];

const MusicNoteIcon = () => (
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M9 14.25V4.5L18 3V12.75" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M3 17.25C3 18.4918 4.00819 19.5 5.25 19.5C6.49181 19.5 7.5 18.4918 7.5 17.25C7.5 16.0082 6.49181 15 5.25 15C4.00819 15 3 16.0082 3 17.25H3" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M15 15.25C15 16.4918 16.0082 17.5 17.25 17.5C18.4918 17.5 19.5 16.4918 19.5 15.25C19.5 14.0082 18.4918 13 17.25 13C16.0082 13 15 14.0082 15 15.25V15.25" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>
 
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14">
    <path d="M6 4l14 8-14 8V4z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.49998 1.25H6.24998C6.01986 1.25 5.83331 1.43655 5.83331 1.66667V8.33333C5.83331 8.56345 6.01986 8.75 6.24998 8.75H7.49998C7.7301 8.75 7.91665 8.56345 7.91665 8.33333V1.66667C7.91665 1.43655 7.7301 1.25 7.49998 1.25Z" stroke="white" stroke-width="0.83" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.74998 1.25H2.49998C2.26986 1.25 2.08331 1.43655 2.08331 1.66667V8.33333C2.08331 8.56345 2.26986 8.75 2.49998 8.75H3.74998C3.9801 8.75 4.16665 8.56345 4.16665 8.33333V1.66667C4.16665 1.43655 3.9801 1.25 3.74998 1.25Z" stroke="white" stroke-width="0.83" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const EditIcon = () => (
 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
   <g clip-path="url(#clip0_111_1995)">
   <path d="M12.3516 3.97373C12.9934 3.33208 12.9935 2.29008 12.3518 1.64827C11.7102 1.00646 10.6682 1.00633 10.0264 1.64798L2.24122 9.43489C2.10578 9.56993 2.00562 9.7362 1.94955 9.91906L1.17897 12.4577C1.14825 12.5605 1.17643 12.6719 1.25235 12.7476C1.32826 12.8234 1.43965 12.8514 1.54238 12.8206L4.08163 12.0506C4.26432 11.995 4.43057 11.8954 4.5658 11.7606L12.3516 3.97373" stroke="#8A7A9E" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
   </g>
   <defs>
   <clipPath id="clip0_111_1995">
   <rect width="14" height="14" fill="white"/>
   </clipPath>
   </defs>
</svg>

);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.0833 3.50008V11.6667C11.0833 12.3106 10.5606 12.8334 9.91667 12.8334H4.08333C3.43943 12.8334 2.91667 12.3106 2.91667 11.6667V3.50008M1.75 3.50008H12.25M4.66667 3.50008V2.33341C4.66667 1.68951 5.18943 1.16675 5.83333 1.16675H8.16667C8.81057 1.16675 9.33333 1.68951 9.33333 2.33341V3.50008" stroke="#FF2056" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>
);

const formatTime = (totalSeconds) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, "0")}`;
};

const RingtoneCard = ({ ringtone, isPlaying, elapsedSec, onToggleActive, onPlayPause, onEdit, onDelete }) => {
  const progressPercent = isPlaying ? Math.min(100, (elapsedSec / ringtone.durationSec) * 100) : 0;

  return (
    <div className="ringtone-card">
      <div className="ringtone-top">
        <div className="ringtone-icon-wrap">
          <MusicNoteIcon />
        </div>

        <div className="ringtone-info">
          <div className="ringtone-name-row">
            <span className="ringtone-name">{ringtone.name}</span>
            {ringtone.isDefault && <span className="default-badge">DEFAULT</span>}
          </div>
          <span className="ringtone-duration">{ringtone.durationLabel}</span>
        </div>

        <div className="ringtone-status">
          <span className={"status-badge" + (ringtone.active ? " status-active" : " status-disabled")}>
            {ringtone.active ? "Active" : "Disabled"}
          </span>
          <button
            className={"toggle-switch" + (ringtone.active ? " toggle-switch-on" : "")}
            onClick={() => onToggleActive(ringtone.id)}
            aria-label={ringtone.active ? "Disable ringtone" : "Activate ringtone"}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>

      <div className="ringtone-bottom">
        <button className="play-button" onClick={() => onPlayPause(ringtone.id)}>
          <span className="play-icon-wrap">{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
          {!isPlaying && <span>Play</span>}
        </button>

        {isPlaying && (
          <div className="play-progress">
            <span className="progress-time">{formatTime(elapsedSec)}</span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="progress-time">{ringtone.durationLabel}</span>
          </div>
        )}

        <div className="ringtone-actions">
          <button className="icon-button" onClick={() => onEdit(ringtone)} aria-label="Edit ringtone">
            <EditIcon />
          </button>
          <button className="icon-button" onClick={() => onDelete(ringtone)} aria-label="Delete ringtone">
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const RingtoneSettings = () => {
  const [ringtones, setRingtones] = useState(initialRingtones);
  const [playingId, setPlayingId] = useState(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // One real <audio> element per ringtone, created once and reused.
  const audioRefs = useRef({});

  const getAudio = (ringtone) => {
    if (!audioRefs.current[ringtone.id]) {
      const audio = new Audio(ringtone.src);
      audioRefs.current[ringtone.id] = audio;
    }
    return audioRefs.current[ringtone.id];
  };

  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  const stopAudio = (id) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.ontimeupdate = null;
      audio.onended = null;
    }
    setPlayingId(null);
    setElapsedSec(0);
  };

  const handlePlayPause = (id) => {
    const ringtone = ringtones.find((r) => r.id === id);
    if (!ringtone) return;

    if (playingId === id) {
      stopAudio(id);
      return;
    }

    if (playingId) {
      stopAudio(playingId);
    }

    const audio = getAudio(ringtone);
    audio.currentTime = 0;
    audio.ontimeupdate = () => setElapsedSec(audio.currentTime);
    audio.onended = () => {
      setPlayingId(null);
      setElapsedSec(0);
    };

    audio
      .play()
      .then(() => setPlayingId(id))
      .catch((err) => {
        console.error("Could not play ringtone:", ringtone.name, err);
      });
  };

  const handleToggleActive = (id) => {
    setRingtones((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : { ...r, active: false }))
    );
  };

  const handleEdit = (ringtone) => {
    // hook up your edit modal / route here
    console.log("Edit ringtone:", ringtone.name);
  };

  const handleDelete = (ringtone) => {
    // hook up your delete confirmation + API call here
    if (playingId === ringtone.id) stopAudio(ringtone.id);
    delete audioRefs.current[ringtone.id];
    setRingtones((prev) => prev.filter((r) => r.id !== ringtone.id));
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleUploadSubmit = ({ name, files }) => {
    // hook up your real upload API call here (send `files` to your backend,
    // then push the returned ringtone — with its real hosted `src` URL — into state)
    const firstFile = files[0];
    const newRingtone = {
      id: `ringtone-${Date.now()}`,
      name,
      isDefault: false,
      durationLabel: `${Math.round(firstFile?.durationSec || 0)}:00 sec`.replace(/^0:/, "0:"),
      durationSec: Math.round(firstFile?.durationSec || 0),
      active: false,
      src: firstFile?.url || firstFile?.src || "",
    };
    setRingtones((prev) => [...prev, newRingtone]);
  };

  return (
    <div className="ringtone-page">
      <div className="ringtone-header">
        <h1 className="ringtone-title">Whistlez Ringtone</h1>
        <button className="add-ringtone-button" onClick={handleAddNew}>
          Add New Ringtone
        </button>
      </div>

      <div className="ringtone-grid">
        {ringtones.map((ringtone) => (
          <RingtoneCard
            key={ringtone.id}
            ringtone={ringtone}
            isPlaying={playingId === ringtone.id}
            elapsedSec={elapsedSec}
            onToggleActive={handleToggleActive}
            onPlayPause={handlePlayPause}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <UploadRingtoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUploadSubmit}
      />
    </div>
  );
};

export default RingtoneSettings;