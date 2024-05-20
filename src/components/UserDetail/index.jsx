import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchModel } from '../../lib/fetchModelData';
import { path } from '../../path';
import './styles.css';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchModel(`${path}api/user/${userId}`)
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  

  return (
    <Grid container className="user-detail">
      <Grid item xs={12} className="user-detail-item">

        <Typography color="textSecondary" className="user-detail-label"> <PersonIcon /> ID:</Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {user && `${user._id}`}
        </Typography>

        <Typography color="textSecondary" className="user-detail-label"> <PersonIcon /> Name:</Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {user && `${user.first_name} ${user.last_name}`}
        </Typography>

        <Typography color="textSecondary" className="user-detail-label"><DescriptionIcon /> Description:</Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {user && `${user.description}`}
        </Typography>

        <Typography color="textSecondary" className="user-detail-label"><LocationOnIcon /> Location:</Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {user && `${user.location}`}
        </Typography>

        <Typography color="textSecondary" className="user-detail-label"><WorkIcon /> Occupation:</Typography>
        <Typography variant="h6" gutterBottom className="user-detail-value">
          {user && `${user.occupation}`}
        </Typography>
      </Grid>
      <Grid item xs={12} className="button-container">
        <Button
          size="large"
          to={user && `/photos/${user._id}`}
          component={Link}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "See Photos"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default UserDetail;
