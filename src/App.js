
import './App.css';
import MainComponent from './components/log-in/main-page';
import { BrowserRouter } from 'react-router-dom';
import Administration from "../src/components/administration/administration-component";
import Configuration from "../src/components/configuration/configuration-component";
import Login from "../src/components/log-in/log-in-component"
import SignIn from "../src/components/sign-in/sign-in-component"
import History from "../src/components/history/history-component"
import { AuthProvider } from './components/util/AuthContext';

import {
  BrowserRouter as Router, Switch, Routes,
  Route, Redirect, useNavigate
} from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <div className="App">
      <BrowserRouter>
      <Routes>
            <Route path="/administrator" element={<Administration />}/>
            <Route path="/configuration" element={<Configuration />}/>
            <Route path="/history" element={<History></History>}/>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<PageNotFound  />} />
      </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
    
  );
}

function PageNotFound() {
  return (
    <div>
        <p>404 Page not found</p>
    </div>
  );
}

export default App;
