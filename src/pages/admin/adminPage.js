import React from "react";
import Menu from "./menu";
import OrderTable from "./orderTable";
import "./adminPage.css";

export default function AdminPage() {
  return (
    <div className="admin-container">
      <Menu />
      <main className="main-content">
        <h1 className="main-title">Сүүлийн үеийн захиалга</h1>
        <OrderTable />
      </main>
    </div>
  );
}
