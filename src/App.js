
import './App.css';
import MainComponent from './components/log-in/main-page';
import { BrowserRouter } from 'react-router-dom';
import Administration from "../src/components/administration/administration-component";
import Configuration from "../src/components/configuration/configuration-component";
import Login from "../src/components/log-in/log-in-component"
import SignIn from "../src/components/sign-in/sign-in-component"
import Home from "../src/components/home/home-component"

import {
  BrowserRouter as Router, Switch, Routes,
  Route, Redirect, useNavigate
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
            <Route path="/administrator" element={<Administration />}/>
            <Route path="/configuration" element={<Configuration />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
