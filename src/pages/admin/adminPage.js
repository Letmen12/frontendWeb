import React, { useState } from "react";
import Menu from "./menu";
import OrderTable from "./orderTable";
import "./adminPage.css";
import UserListPage from "./usersListPage";

export default function AdminPage() {
  const [selectedMenu, setSelectedMenu] = useState("orders"); 

  function handleMenuClick(menuKey) {
    setSelectedMenu(menuKey);
  }

  function renderContent() {
    switch (selectedMenu) {
      case "orders":
        return <OrderTable />;
      case "userList":
        return <UserListPage />;
      default:
        return <OrderTable />;
    }
  }

  return (
    <div className="admin-container">
      <Menu onMenuClick={handleMenuClick} selectedMenu={selectedMenu} />
      <main className="main-content">
        <h1 className="main-title">
          {selectedMenu === "orders"
            ? "Сүүлийн үеийн захиалга"
            : selectedMenu === "userList"
            ? "Хэрэглэгчдийн мэдээлэл"
            : ""}
        </h1>
        {renderContent()}
      </main>
    </div>
  );
}
