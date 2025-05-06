import React, { useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Имэйл болон нууц үгээ бөглөнө үү.');
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:3000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Амжилттай нэвтэрлээ!');
      navigate('/home');
    } catch (err) {
      console.log(err); 
      if (err.response) {
        setMessage(err.response.data.message || "Нэвтрэх нэр эсвэл нууц үг буруу байна.");
      } else {
        setMessage("Сервертэй холбогдож чадсангүй.");
      }
    }
  };  
  
  return (
    <div className="container">
      <div className="left-panel">
        <div className="form-container">
          <h2 className="form-title ">Нэвтрэх</h2>
          {message && <p className="text-sm text-red-500 mb-3">{message}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
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

            <button type="submit" className="button primary">Нэвтрэх</button>

            <button type="button" className="button google">Log in with Google</button>

            <button type="button" className="button register"  onClick={() => navigate("/register")}>Бүртгүүлэх</button>

          </form>
        </div>
      </div>
      <div className="right-panel">
        <img src="/login.png" alt="login art" />
      </div>
    </div>
  );
}
