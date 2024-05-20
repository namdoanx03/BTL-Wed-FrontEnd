
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { path } from "../../path";
import './styles.css'

const TopBar = ({ auth, setAuth }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [context, setContext] = useState('');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const token = localStorage.getItem('token'); 
  useEffect(() => {

    if (token && user) {
      let userId;
      if (pathname.includes("/user")) {
        userId = pathname.split("/").pop();
      } else if (pathname.includes("/photos")) {
        userId = pathname.split("/")[2];
      }
      const fetchUserData = async () => {
        const response = await fetch(`${path}api/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
        if (response.ok) {
          if(userId){

            // const data = await response.json();
            
            // if (pathname.includes("/photos")) {
            //   setContext(`Photos of ${data.first_name} ${data.last_name}`);
            // } else {
            //   setContext(`Details of ${data.first_name} ${data.last_name}`);
            // }
          }
        } else {
          setContext('');
          if (response.status === 401) {
            
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setAuth({ loggedIn: false, user: null });
            navigate("/login");
          }
        }
      };
      fetchUserData();
    }
  }, [pathname, navigate, setAuth, user, token]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    setAuth({ loggedIn: false, user: null }); 
    navigate("/login"); 
  };
  const backHome = () => {
    navigate('/register');
  }
  

  return (
    <AppBar className="headerPage topbar-appBar position-fixed" position="absolute">
      <Toolbar>
        {!token && 
        <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
           YOU ARE NOT LOGGED IN {context}
        </Typography>
        }
        <div className="backHome text-center" onClick={() => backHome()} >
          Home
        </div>
        {token &&
          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }} onClick = {() => backHome()} className="HomeName">
            Home {context}
          </Typography>
        }
        {user && (
          <>
          <Button color="inherit" component={Link} to={`/upload-photo`}>
              Add Photo
            </Button>
            <Button color="inherit" component={Link} to={`/profile/${user._id}`}>
              Profile
            </Button>
            <Button style={{ color: 'red' }} onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
