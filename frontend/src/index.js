import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom"
import './index.css';
import App from './App';
import {Routes, Route } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import About from './component/about';
import Getlist from  './component/getlist';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <Routes>
        <Route path="/" exact element={<App/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" exact element={<About/>} />
        <Route path="/getlist" exact element={<Getlist/>} />
      </Routes>
    </HashRouter>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
