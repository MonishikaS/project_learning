export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Nimbus Learning</div>
      <div className="nav-links">
        <a href="#">Dashboard</a>
        <a href="#">Instructor View</a>
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
