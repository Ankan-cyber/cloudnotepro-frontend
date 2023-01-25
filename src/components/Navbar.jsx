import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // eslint-disable-next-line
        { }
    }, [location]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ margin: "auto", paddingLeft: "28px" }}>CloudNotePro</Link>
                <button className="navbar-toggler mx-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse mx-4 navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ?
                        '' : <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar