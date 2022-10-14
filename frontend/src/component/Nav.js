import React from 'react';
import {Link} from 'react-router-dom';
function Nav(){
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark top">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navMainMenu" class="navbar-collapse collapse">
                <div class="navbar-nav ml-auto">
                    <Link to='/Register' className="nav-item nav-link">Register</Link>
                    <Link to='/Login' className="nav-item nav-link">Login</Link>
                    <Link to='/about' className="nav-item nav-link">About</Link>
                    <Link to='/getlist' className="nav-item nav-link">Getlist</Link>
                    
                </div>
            </div>
        </nav>
    );
}

export default Nav;