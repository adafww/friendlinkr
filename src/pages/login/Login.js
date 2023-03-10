import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './LoginStyle.css';

const Login = ({ onLogin }) => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const API_PORT = process.env.REACT_APP_API_PORT;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRedirect, setIsRedirect] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post('http://' + API_HOST + ':' + 
      + API_PORT + '/api/v1/auth/login', { email, password });
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('username', response.data.data.first_name);
      if (response.status === 200) {
        onLogin();
        setIsRedirect(true);
      }
    } catch (error) {
      console.error(error); // здесь можно обработать ошибку
    }
  };

  if (isRedirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login__wrapper">
      <h2 className="login__title form__title">Войдите в аккаунт</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login_form-group">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            className="login__form-control"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login_form-group">
          <label htmlFor="login-password">Пароль</label>
          <input
            type="password"
            className="login__form-control"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login__action">
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
          <Link className="login__link" to="/forgot">
            Забыли пароль?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;