import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { path } from "../../path";

function Register() {
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [occupation, setOccupation] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const response = await fetch(`${path}admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login_name: loginName,
        password : password,
        first_name: firstName,
        last_name: lastName,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setSuccessMessage("User registered successfully");
      navigate("/")
      setErrorMessage("");
      setLoginName("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
    } else {
      setErrorMessage(data.error);
      setSuccessMessage("");
    }
  };

  return (
    <Container>
      <h1 className="text-center w-50 mb-4">Register</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="loginName">
          <Form.Control
            className="w-50 p-2 "
            type="text"
            placeholder="Username"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex flex-nowrap w-50 justify-content-between mt-3" >
          <Form.Group controlId="password" >
            <Form.Control
              className="p-2"
              style={{ width: '270px' }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" >
            <Form.Control
              className="p-2"
              style={{ width: '270px' }}
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
        </div>
        <div className="d-flex flex-nowrap w-50 justify-content-between mt-3" >
          <Form.Group controlId="firstName">
            <Form.Control
              className="p-2"
              style={{ width: '270px' }}
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Control
              className="p-2"
              style={{ width: '270px' }}
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
        </div>
        
        <Form.Group controlId="location">
          <Form.Control
            className="w-50 p-2 my-3"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="occupation">
          <Form.Control
            className="w-50 p-2 mb-3"
            type="text"
            placeholder="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Control
            className="w-50 p-2 "
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <div className="mt-3 text-center w-50">
          <Button variant="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
