export default function menu({ onMenuClick, selectedMenu }) {
  const handleLogout = () => {
    
    localStorage.removeItem('token'); 
    window.location.href = '/login'; 
  };
    return (
      <aside className="menu">
      <div className='sider-title'>
        <img src="/logo.png" alt="Profile" className="profile-image" />
        <h3 className="sidebar-title">QGeneret.mn</h3>
      </div>
      <div className="menu-nav">
        <button className={selectedMenu === "orders" ? "active" : ""}
          onClick={() => onMenuClick("orders")}>Захиалга</button>
        <button className={selectedMenu === "userList" ? "active" : ""}
          onClick={() => onMenuClick("userList")}>Хэрэглэгчийн мэдээлэл</button>
      </div>
      <button
          onClick={handleLogout}
          className="exit-button"
      >Гарах
      </button>
    </aside>
    );
  }