import React, { useState } from "react";
import './log-in.css';
import {
  BrowserRouter as Router, Switch, Routes,
  Route, Redirect, useNavigate, Link
} from "react-router-dom";


export default function LogInComponent() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

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

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);


    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        navigate('/administrator');
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };


  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


  return (
    <div>
      <div className="app">
        <div className="sigin-form">
          <div className="mySignInStyle">
            <div className="title2">INGRESAR AL SISTEMA</div>
            <br></br>
            <div>
              <form onSubmit={handleSubmit}>

                <label style = {{fontSize:"14px"}}>Nombre de usuario </label>
                <input type="text" name="uname" required />
                {renderErrorMessage("uname")}

                <br></br>
                <label style = {{fontSize:"14px"}}>Password </label>
                <input type="password" name="pass" required />
                {renderErrorMessage("pass")}

                <br></br>
                <div>
                  <div style={{width: "30%", float:"left"}}>
                  <button className="button3">Ingresar</button>
                  </div>

                  <div style={{width: "70%", float:"right"}}>
                  <button className="button3">Cancelar</button>
                  </div>
                  
                  
                </div>
                <div  style={{marginTop:"4em"}}>
                  
                <Link>Registrate</Link>
                  </div>                
                
              </form>


            </div>
          </div>
        </div>

      </div>
    </div>

  );
}

