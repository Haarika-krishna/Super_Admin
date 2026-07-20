import React, { useMemo, useState } from "react";
import "./Users.css";

// Sample data — replace with your API response.
// avatar: { type: "image", src } or { type: "initial", letter, color }
const usersData = [
  {
    sno: "01",
    name: "Venky K.",
    email: "venky@buzzsounds.com",
    phone: "+91 84569 65478",
    joined: "Oct 24, 2023",
    avatar: { type: "image", src: "https://i.pravatar.cc/40?img=12" },
  },
  {
    sno: "02",
    name: "Alice Smith",
    email: "alice@soundart.io",
    phone: "+91 94569 65478",
    joined: "Oct 22, 2023",
    avatar: { type: "initial", letter: "A", color: "#bff0d8", textColor: "#1a7a4c" },
  },
  {
    sno: "03",
    name: "Bob Johnson",
    email: "bjohnson@design.co",
    phone: "+91 77789 45896",
    joined: "Oct 19, 2023",
    avatar: { type: "initial", letter: "B", color: "#f9cfe3", textColor: "#b0296b" },
  },
  {
    sno: "04",
    name: "Venky K.",
    email: "venky@buzzsounds.com",
    phone: "+91 84569 65478",
    joined: "Oct 24, 2023",
    avatar: { type: "image", src: "https://i.pravatar.cc/40?img=13" },
  },
  {
    sno: "05",
    name: "Alice Smith",
    email: "alice@soundart.io",
    phone: "+91 94569 65478",
    joined: "Oct 22, 2023",
    avatar: { type: "initial", letter: "A", color: "#f7c9a3", textColor: "#a15316" },
  },
  {
    sno: "06",
    name: "Alice Smith",
    email: "alice@soundart.io",
    phone: "+91 94569 65478",
    joined: "Oct 22, 2023",
    avatar: { type: "image", src: "https://i.pravatar.cc/40?img=32" },
  },
  {
    sno: "07",
    name: "Bob Johnson",
    email: "bjohnson@design.co",
    phone: "+91 77789 45896",
    joined: "Oct 19, 2023",
    avatar: { type: "image", src: "https://i.pravatar.cc/40?img=15" },
  },
  {
    sno: "08",
    name: "Venky K.",
    email: "venky@buzzsounds.com",
    phone: "+91 84569 65478",
    joined: "Oct 24, 2023",
    avatar: { type: "initial", letter: "V", color: "#e2d6fb", textColor: "#6d28d9" },
  },
  {
    sno: "09",
    name: "Gukesh Kumar",
    email: "gukeshkumar@gamil.com",
    phone: "+91 77789 45896",
    joined: "Oct 19, 2023",
    avatar: { type: "initial", letter: "G", color: "#bfeaf0", textColor: "#127586" },
  },
  {
    sno: "10",
    name: "Clara Oswald",
    email: "clara@spacetime.org",
    phone: "+91 68296 68873",
    joined: "Oct 15, 2023",
    avatar: { type: "image", src: "https://i.pravatar.cc/40?img=47" },
  },
];

const TOTAL_PAGES = 4;

const Avatar = ({ avatar, name }) => {
  if (avatar.type === "image") {
    return <img className="user-avatar-img" src={avatar.src} alt={name} />;
  }
  return (
    <div
      className="user-avatar-initial"
      style={{ background: avatar.color, color: avatar.textColor }}
    >
      {avatar.letter}
    </div>
  );
};

const Users = () => {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("Joined Date");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return usersData;
    return usersData.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [search]);

  const goToPage = (page) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setCurrentPage(page);
  };

  return (
    <div className="users-page">
      <h1 className="users-title">Users</h1>

      <div className="users-panel">
        <div className="users-toolbar">
          <div className="users-search">
            <svg className="users-search-icon" viewBox="0 0 24 24" width="16" height="16">
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

          <div className="users-filter">
            <span className="users-filter-label">Filter by</span>
            <select
              className="users-filter-select"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option>Joined Date</option>
              <option>Name</option>
              <option>Email</option>
            </select>
          </div>
        </div>

        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>PROFILE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE NUMBER</th>
                <th>JOINED</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.sno}>
                  <td>{user.sno}</td>
                  <td>
                    <Avatar avatar={user.avatar} name={user.name} />
                  </td>
                  <td className="cell-name">{user.name}</td>
                  <td className="cell-muted">{user.email}</td>
                  <td className="cell-muted">{user.phone}</td>
                  <td className="cell-muted">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="users-pagination">
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

export default Users;
