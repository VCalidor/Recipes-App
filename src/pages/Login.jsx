import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const validation = () => {
    const numberValidation = 7;
    const emailValidation = (/\S+@\S+\.\S+/).test(email);
    const passwordValidation = password.length < numberValidation;
    return !emailValidation || passwordValidation;
  };

  const login = () => {
    const obj = { email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(obj));
    return history.push('/foods');
  };

  return (
    <section className="Login">
      <input
        className="login-email"
        data-testid="email-input"
        type="email"
        placeholder="Email: "
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <input
        className="login-password"
        data-testid="password-input"
        type="password"
        placeholder="Password: "
        value={ password }
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <button
        className="login-btn"
        type="button"
        data-testid="login-submit-btn"
        disabled={ validation() }
        onClick={ login }
      >
        Enter
      </button>
    </section>
  );
}
