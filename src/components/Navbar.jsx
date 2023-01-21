import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    useEffect(() => {
        // eslint-disable-next-line
        {}
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">CloudNotePro</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                    <Link className="btn btn-success mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-success mx-1" to="/signup" role="button">Signup</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar