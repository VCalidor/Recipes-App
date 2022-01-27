import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    <section>
      <label htmlFor="login-email">
        Email:
        <input
          id="login-email"
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </label>
      <label htmlFor="login-password">
        Password:
        <input
          id="login-password"
          data-testid="password-input"
          type="password"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </label>
      <button
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
