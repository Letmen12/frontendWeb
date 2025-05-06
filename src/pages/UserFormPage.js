import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./UserFormPage.css";

const UserFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Бүх талбарыг бүрэн бөглөнө үү");
      return;
    }
    navigate("/UserProfilePage", { state: { user: formData } });
  };

  return (
    <div className="form-container">
      <Card>
        <CardContent>
          <Typography className="form-title">Хувийн мэдээлэл</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className="input-field"
                label="Эцэг/эхийн нэр"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className="input-field"
                label="Нэр"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className="input-field"
                label="Утас"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className="input-field"
                label="Имэйл"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className="input-field"
                label="Төрсөн огноо"
                name="birthDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.birthDate}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className="input-field"
                label="Хүйс (Жишээ: Эрэгтэй / Эмэгтэй)"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Иргэншил"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Хаяг"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Мэргэжил"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ажлын газар"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Боловсрол"
                name="education"
                value={formData.education}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Өөрийн тухай"
                name="bio"
                multiline
                rows={3}
                value={formData.bio}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Зураг (URL хэлбэрээр)"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            className="create-button"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Үүсгэх
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserFormPage;
