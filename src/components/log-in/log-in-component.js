import React, { useState } from "react";
import './log-in.css';
import { useAuth } from "../util/AuthContext"
import { orderApi } from '../util/OrderApi'
import { parseJwt, handleLogError } from '../util/Helpers'
import { ToastContainer, toast } from 'react-toastify';

import {
  BrowserRouter as Router, Switch, Routes,
  Route, Redirect, useNavigate, Link
} from "react-router-dom";

export default function LogInComponent() {
  const navigate = useNavigate();
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleUserName = (e) => {
    setUserName(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!(userName && password)) {
      errorMessage();
      return
    }
    try {
      const response = await orderApi.authenticate(userName, password)
      const { accessToken } = response.data
      const data = parseJwt(accessToken)
      const authenticatedUser = { data, accessToken }
      Auth.userLogin(authenticatedUser)
      Auth.userToken(accessToken);
      setUserName('')
      setPassword('')
      navigate('/administrator');
    } catch (error) {
      handleLogError(error)
      errorMessage();
    }
  }

  const errorMessage = () => {
    toast.error("!CREDENCIALES INCORRECTAS!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 20000
    });
  }

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  return (
    <div>
      <div className="app">
        <div className="sigin-form">
          <div className="mySignInStyle">
            <div className="title2">INGRESAR AL SISTEMA</div>
            <br></br>
            <div>
              <form onSubmit={handleSubmit}>
                <label style={{ fontSize: "14px" }}>Nombre de usuario </label>
                <input type="text" name="userName" value={userName} onChange={handleUserName} required />
                <br></br>
                <label style={{ fontSize: "14px" }}>Password </label>
                <input type="password" name="password" value={password} onChange={handlePassword} required />
                <br></br>
                <div>
                  <div style={{ width: "30%", float: "left" }}>
                    <button className="button3" onClick={handleSubmit}>Ingresar</button>
                  </div>
                  <div style={{ width: "70%", float: "right" }}>
                    <button className="button3">Cancelar</button>
                  </div>
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

