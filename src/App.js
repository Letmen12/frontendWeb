// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import UserFormPage from "./pages/UserFormPage";
import QrModelPage from "./pages/QrModelPage";
import LoginForm from "./pages/authentication/login";
import RegisterForm from "./pages/authentication/signUp";
import AdminPage from "./pages/admin/adminPage";
import OrdersPage from "./pages/menu/MyOrdersPage";
import OffersPage from "./pages/menu/OffersPage";
import { Navigate } from 'react-router-dom';
import BusinessCardViewerPage from "./pages/BusinessCardViewerPage";
import EmpthyPage from "./pages/EmpthyPage";
import CardsPage from "./pages/menu/CardsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/UserProfilePage" element={<UserProfilePage />} />
      <Route path="/UserFormsPage" element={<UserFormPage />} />
      <Route path="/qrmodel" element={<QrModelPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/adminPage" element={<AdminPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/business-card/:id" element={<BusinessCardViewerPage />} />
      <Route path="/empthy" element={<EmpthyPage />} />
      <Route path="/cardsPage" element={<CardsPage />} />
    </Routes>
  );
}
