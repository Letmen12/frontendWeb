import React, { useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css"; 

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      setMessage("Бүх талбарыг бөглөнө үү.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/register", {
        email,
        password,
        username,
      });

      setMessage("Амжилттай бүртгэгдлээ!");
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Бүртгэл амжилтгүй боллоо.");
      } else {
        setMessage("Сервертэй холбогдож чадсангүй.");
      }
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="form-container">
          <h2 className="form-title">Бүртгүүлэх</h2>
          {message && <p className="text-sm text-red-500 mb-3">{message}</p>}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Username input */}
            <div className="input-wrapper">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Хэрэглэгчийн нэр"
                required
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none"
              />
              <FaUser className="input-icon" />
            </div>

            {/* Email input */}
            <div className="input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Имэйл"
                required
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none"
              />
              <FaEnvelope className="input-icon" />
            </div>

            {/* Password input */}
            <div className="input-wrapper">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Нууц үг"
                required
                className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded focus:outline-none"
              />
              <FaLock className="input-icon" />
              <div
                onClick={() => setShowPass(!showPass)}
                className="input-icon"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button type="submit" className="button.primary">Бүртгүүлэх</button>

            <p className="text-center text-sm text-gray-500">Аль хэдийн бүртгэлтэй юу?
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="button.register"
            >
              Нэвтрэх
            </button>
          </form>
        </div>
      </div>
      <div className="right-panel">
        <img src="/login.png" alt="register art" />
      </div>
    </div>
  );
}
