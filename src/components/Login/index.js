import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { path } from '../../path';
import { toast } from 'react-toastify';

function Login({ setAuth }) {
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${path}admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login_name: loginName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuth({ loggedIn: true, user: data.user });

        toast.success(`Login successful, welcome ${data.user.first_name}!`);
        navigate(`/users/${data.user._id}`); // Redirect to UserDetail with the user's ID

      } else {
        toast.error(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <Container>
      <h1 className='text-center w-50 mb-4'>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="loginName">
          <Form.Control className="w-50 p-2" type="text" placeholder="Email or username" value={loginName} onChange={e => setLoginName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control type="password" className="w-50 p-2 my-3" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" className='mt-3 w-50' type="submit">Sign In</Button>
      </Form>
      <div className="mt-3 text-center w-50">
        Not a member?
        <span className='text-danger ' onClick={handleRegisterRedirect}>
          Register
        </span>
      </div>
    </Container>
  );
}

export default Login;
