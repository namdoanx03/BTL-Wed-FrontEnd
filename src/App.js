import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from './components/Profile';
import UploadPhoto from './components/UploadFile';
import { fetchModel } from './lib/fetchModelData';
import { path } from './path';

const App = (props) => {
  const [auth, setAuth] = useState({
    loggedIn: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user'))
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (auth.loggedIn) {
      updateUsers();
    }
  }, [auth.loggedIn]);

  const updateUsers = async () => {
    const updatedUsers = await fetchModel(`${path}user/list`);
    setUsers(updatedUsers);
  };

  return (
    <>
      <Router>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar auth={auth} setAuth={setAuth} />
            </Grid>
            <div className="main-topbar-buffer" />
            <Grid item sm={3} style={{ height: "calc(100vh - 70px)" }}>
              <Paper className="main-grid-item" style={{ minHeight: "calc(100vh - 70px)" }}>
                {auth.loggedIn ? (
                  <UserList users={users} updateUsers={updateUsers} />
                ) : (
                  <Typography>Please log in to see the user list.</Typography>
                )}
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item" style={{ minHeight: "calc(100vh - 70px)" }}>
                <Routes>
                  {auth.loggedIn ? (
                    <>
                      <Route path="/profile/:userId" element={<Profile auth={auth} setAuth={setAuth} updateUsers={updateUsers} />} />
                      <Route path="/users/:userId" element={<UserDetail />} />
                      <Route path="/photos/:userId" element={<UserPhotos />} />
                      <Route path="/upload-photo" element={<UploadPhoto />} />
                      <Route path="/users" element={<UserList users={users} updateUsers={updateUsers} />} />
                      <Route path="*" element={<Navigate to={`/users/${auth.user._id}`} />} />
                    </>
                  ) : (
                    <>
                      <Route path="/login" element={<Login setAuth={setAuth} />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="*" element={<Navigate to="/login" />} />
                    </>
                  )}
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
