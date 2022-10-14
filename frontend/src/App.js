import React from 'react';
import './App.css';
import {Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <h1>
        Welcome to FileSystem!!
      </h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
     
      
      
    </div>
  );
}

export default App;
