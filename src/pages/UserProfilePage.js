import React from "react";
import {
  Typography,
  Avatar,
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
import {  useLocation, useNavigate  } from "react-router-dom";
import "./UserProfilePage.css";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


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

  return (
    <div className="user-profile-container">
      <div className="profile-card">
      <IconButton onClick={() => navigate('/home')} className="back-button" aria-label="back">
        <ArrowBackIcon />
      </IconButton>
        <div className="profile-header">
          {user.profileImage ? (
            <Avatar
              src={user.profileImage}
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
    </div>
  );
};

export default UserProfilePage;
