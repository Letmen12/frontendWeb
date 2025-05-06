// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import UserFormPage from "./pages/UserFormPage";
import QrModelPage from "./pages/QrModelPage";
import LoginForm from "./pages/authentication/login";
import RegisterForm from "./pages/authentication/signUp";
import { Navigate } from 'react-router-dom';

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
    </Routes>
  );
}
