export default function menu() {
  const handleLogout = () => {
    
    localStorage.removeItem('token'); 
    window.location.href = '/login'; 
  };
    return (
      <aside className="menu">
      <div className='menu-title'>
      <img src="/logo.png" alt="Profile" className="profile-image" />
        <h3 className="menu-title">QGeneret.mn</h3>
      </div>
      <div className="menu-nav">
        <button className="active">Захиалга</button>
        <button>Загвар</button>
      </div>
      <button
          onClick={handleLogout}
          className="exit-button"
      >Гарах
      </button>
    </aside>
    );
  }