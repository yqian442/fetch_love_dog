import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
const BASE_URL = 'https://frontend-take-home-service.fetch.com';

const Login = ({ setIsAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [redirectToSearch, setRedirectToSearch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hit the login endpoint to authenticate user
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
        credentials: "include",
      });

      if (response.ok) {
        const accessToken = response.headers.get('fetch-access-token');
        if (accessToken) {
          setIsAuthenticated(true);
          setRedirectToSearch(true);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  if (redirectToSearch) {
    return <Redirect to="/fetchDogs" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;











