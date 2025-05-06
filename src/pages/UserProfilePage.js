import React from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import "./UserProfilePage.css";


const UserProfilePage = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <Typography>Мэдээлэл олдсонгүй.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, px: 2 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            {user.profileImage ? (
              <Avatar
                src={user.profileImage}
                alt={user.lastName}
                sx={{ width: 100, height: 100, mr: 3 }}
              />
            ) : (
              <Avatar sx={{ width: 100, height: 100, mr: 3 }}>
                {user.lastName?.charAt(0)}
              </Avatar>
            )}
            <Box>
              <Typography variant="h5">
                {user.lastName} {user.firstName}
              </Typography>
              <Typography variant="subtitle1">{user.jobTitle}</Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Утас:</strong> {user.phone}</Typography>
              <Typography><strong>Имэйл:</strong> {user.email}</Typography>
              <Typography><strong>Төрсөн огноо:</strong> {user.birthDate}</Typography>
              <Typography><strong>Хүйс:</strong> {user.gender}</Typography>
              <Typography><strong>Иргэншил:</strong> {user.nationality}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography><strong>Хаяг:</strong> {user.address}</Typography>
              <Typography><strong>Ажлын газар:</strong> {user.company}</Typography>
              <Typography><strong>Боловсрол:</strong> {user.education}</Typography>
              <Typography><strong>Өөрийн тухай:</strong> {user.bio}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfilePage;
