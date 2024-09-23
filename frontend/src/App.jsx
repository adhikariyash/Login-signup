import React from 'react';
import Home from './components/Home';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './Nav';
import LoggedIn from './components/LoggedIn';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logged" element={<LoggedIn />} />
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
