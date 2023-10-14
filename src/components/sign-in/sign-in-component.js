// inside src/App.js
// Replace previous code with this.

import React, { useState } from "react";
import './sign-in.css';

export default function SignInComponent() {

  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'username':
          if (!value) {
            stateObj[name] = 'Please enter Username.';
          }
          break;

        case 'email':
          if (!value) {
            stateObj[name] = 'Please enter Email.';
          }
          break;

        case 'password':
          if (!value) {
            stateObj[name] = 'Please enter Password.';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj['confirmPassword'] =
              'Password and Confirm Password does not match.';
          } else {
            stateObj['confirmPassword'] = input.confirmPassword
              ? ''
              : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = 'Please enter Confirm Password.';
          } else if (input.password && value !== input.password) {
            stateObj[name] = 'Password and Confirm Password does not match.';
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <div className="app">
      <div className="sigin-form">
        <div className="mySignInStyle">
          <div className="title2">REGISTRO DE USUARIOS</div>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Ingrese su nombre de usuario"
              value={input.username}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            {error.username && <span className="err">{error.username}</span>}

            <input
              type="text"
              name="email"
              placeholder="Ingrese su email"
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            {error.email && <span className="err">{error.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Ingresar password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            {error.password && <span className="err">{error.password}</span>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar password"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            {error.confirmPassword && (
              <span className="err">{error.confirmPassword}</span>
            )}

            <div>
              <div style={{ width: "37%", float: "left" }}>
                <button className="button3">Registrarse</button>
              </div>

              <div style={{ width: "63%", float: "right" }}>
                <button className="button3">Cancelar</button>
              </div>


            </div>
          </form>
        </div>
      </div>

    </div>

  );
}