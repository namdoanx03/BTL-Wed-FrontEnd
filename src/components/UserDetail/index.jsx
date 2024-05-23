import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { Link, useParams } from "react-router-dom";
import { fetchModel } from '../../lib/fetchModelData';
import { path } from '../../path';
import './styles.css';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchModel(`${path}api/user/${userId}`);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <Grid container className="user-detail" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container className="user-detail" justifyContent="center" alignItems="center">
        <Typography color="error">{error}</Typography>
      </Grid>
    );
  }

  return (
    <Grid container className="user-detail">
      <Grid item xs={12} className="user-detail-item">
        <Typography color="textSecondary" className="user-detail-label">
          <PersonIcon /> ID:
        </Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {user._id}
        </Typography>

        <Typography color="textSecondary" className="user-detail-label">
          <PersonIcon /> Name:
        </Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {`${user.first_name} ${user.last_name}`}
        </Typography>

        <Typography color="textSecondary" className="user-detail-label">
          <DescriptionIcon /> Description:
        </Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {user.description}
        </Typography>

        <Typography color="textSecondary" className="user-detail-label">
          <LocationOnIcon /> Location:
        </Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {user.location}
        </Typography>

        <Typography color="textSecondary" className="user-detail-label">
          <WorkIcon /> Occupation:
        </Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {user.occupation}
        </Typography>
      </Grid>
      <Grid item xs={12} className="button-container">
        <Button
          size="large"
          to={`/photos/${user._id}`}
          component={Link}
          variant="contained"
          color="primary"
        >
          See Photos
        </Button>
      </Grid>
    </Grid>
  );
}

export default UserDetail;
