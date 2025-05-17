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
import { v4 as uuidv4 } from "uuid";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const user_id = uuidv4();
  const user_role_id = "6614bd1d8d23e74342b547a3";

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !fname || !lname || !phone || !address) {
      setMessage("Бүх талбарыг бөглөнө үү.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4004/api/users/register", {
        user_id,
        user_role_id,
        fname,
        lname,
        email,
        phone,
        password,
        address,
      });

      setMessage("Амжилттай бүртгэгдлээ!");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
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
            {/* First name */}
            <div className="input-wrapper">
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="Нэр"
                required
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none"
              />
              <FaUser className="input-icon" />
            </div>

            {/* Last name */}
            <div className="input-wrapper">
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Овог"
                required
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none"
              />
              <FaUser className="input-icon" />
            </div>

            {/* Email */}
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

            {/* Phone */}
            <div className="input-wrapper">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Утасны дугаар"
                required
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none"
              />
              <FaUser className="input-icon" />
            </div>

            {/* Password */}
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

            {/* Address */}
            <div className="input-wrapper">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Гэрийн хаяг"
                required
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none"
              />
              <FaUser className="input-icon" />
            </div>

            <button type="submit" className="button primary">Бүртгүүлэх</button>

            <p className="text-center text-sm text-gray-500">Аль хэдийн бүртгэлтэй юу?</p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="button register"
            >
              Нэвтрэх
            </button>
          </form>
        </div>
      </div>
      <div className="right-panel">
        <img src="/login.png" alt="login art" className="login-image" />
      </div>
    </div>
  );
}
