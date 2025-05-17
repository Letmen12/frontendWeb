import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  Button
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Cake as BirthdayIcon,
  Wc as GenderIcon,
  Public as NationalityIcon,
  Home as AddressIcon,
  Business as CompanyIcon,
  School as EducationIcon,
  Info as BioIcon
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "./UserProfilePage.css";

const UserProfilePage = () => {
  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();

  if (!user) {
    return <Typography>Мэдээлэл олдсонгүй.</Typography>;
  }

  const renderInfoItem = (Icon, label, value) => (
    <div className="profile-info-item">
      <div>
        <Icon className="profile-info-icon" />
        <strong>{label}</strong> {value || "Мэдээлэл алга"}
      </div>
    </div>
  );

  const handleDownloadPDF = () => {
    const input = document.querySelector(".profile-content");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user.lastName || "profile"}-profile.pdf`);
    }).catch((error) => {
      console.error("PDF download error:", error);
    });
  };

  return (
    <div className="user-profile-container">
      <IconButton onClick={() => navigate('/home')} className="user-back-button" aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      <div className="profile-card">
        <div className="profile-content">
          <div className="profile-header">
            {user.profileImage ? (
              <Avatar
                src={`/public/bankcard.jpeg`}
                alt={user.lastName}
                className="profile-avatar"
              />
            ) : (
              <Avatar className="profile-avatar">
                {user.lastName?.charAt(0) || "?"}
              </Avatar>
            )}
            <div className="profile-name-title">
              <div className="profile-name">
                {user.lastName || ""} {user.firstName || ""}
              </div>
              <div className="profile-job">
                {user.jobTitle || "Ажлын байр мэдээлэл алга"}
              </div>
            </div>
          </div>

          <div className="profile-info-grid">
            {renderInfoItem(PhoneIcon, "Утас:", user.phone)}
            {renderInfoItem(EmailIcon, "Имэйл:", user.email)}
            {renderInfoItem(BirthdayIcon, "Төрсөн огноо:", user.birthDate)}
            {renderInfoItem(GenderIcon, "Хүйс:", user.gender)}
            {renderInfoItem(NationalityIcon, "Иргэншил:", user.nationality)}
            {renderInfoItem(AddressIcon, "Хаяг:", user.address)}
            {renderInfoItem(CompanyIcon, "Ажлын газар:", user.company)}
            {renderInfoItem(EducationIcon, "Боловсрол:", user.education)}
            {renderInfoItem(BioIcon, "Өөрийн тухай:", user.bio)}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
            Профайлыг PDF-р хадгалах
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
