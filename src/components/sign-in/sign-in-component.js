
import React, { useState } from "react";
import './sign-in.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../util/AuthContext"
import { orderApi } from '../util/OrderApi'
import { parseJwt, handleLogError } from '../util/Helpers'
import { ToastContainer, toast } from 'react-toastify';
import ResponsiveAppBar from "../responsive-app-bar";

export default function SignInComponent() {

  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()

  const navigate = useNavigate();

  const [input, setInput] = useState({
    user_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    parking:{
      "id_parking":1
    }
  });

  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });



  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(input.user_name && input.password && input.email)) {
      errorMessage("INGRESE LOS CAMPOS OBLIGATORIOS");
      return
    }

    //const user = { input.username, input.password, input.email }

    try {
      const response = await orderApi.signup(input)
      const { accessToken } = response.data
      const data = parseJwt(accessToken)
      const authenticatedUser = { data, accessToken }

      Auth.userLogin(authenticatedUser)

    } catch (error) {
      handleLogError(error)
      errorMessage("ERROR AL REGISTRAR LOS DATOS");
    }
  }

  const errorMessage = (error) => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 20000
    });
  }

  const returnLogin = (event) => {
    event.preventDefault();
    navigate('/');
  };

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
        case 'user_name':
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
    <>
    <ResponsiveAppBar></ResponsiveAppBar>
    <div className="app">
      <div className="sigin-form">
        <div className="mySignInStyle">
          <div className="title2">REGISTRO DE USUARIOS</div>
          <form>
            <input
              type="text"
              name="user_name"
              placeholder="Ingrese su nombre de usuario"
              value={input.user_name}
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
                <button className="button3" onClick={handleSubmit}>Registrarse</button>
              </div>

              <div style={{ width: "63%", float: "right" }}>
                <button className="button3" onClick={returnLogin}>Cancelar</button>
              </div>


            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
    

  );
}