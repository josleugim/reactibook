import React from 'react';
import { AUTH_TOKEN } from "../constants";
import { Link } from 'react-router-dom';

function Header(props) {
    const authToken = sessionStorage.getItem(AUTH_TOKEN);
    return (
        authToken && (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                    </a>
                    <a href="/#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/#" className="navbar-item">
                            Home
                        </a>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {
                                    authToken ? (
                                        <a className="button is-light"
                                           onClick={() => {sessionStorage.removeItem(AUTH_TOKEN); window.location.reload();}}>
                                            Cerrar sesión
                                        </a>
                                    ) : (
                                        <Link to="/login" className="button is-light">
                                            Iniciar sesión
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    )
}

export default Header;