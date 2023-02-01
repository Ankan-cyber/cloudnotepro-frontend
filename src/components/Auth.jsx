import React, { useState, useEffect } from 'react'
import '../css/Login.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Auth = (props) => {

    const navigate = useNavigate();
    let loadingInterval;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
        else {
            fetch(`${props.apiHost}`, {
                method: 'GET'
            });

            document.title = "Login / Signup - CLoudNote Pro"
        }
        // eslint-disable-next-line
    }, [navigate])
    const [logemail, setLogemail] = useState("");
    const [logpassword, setLogpassword] = useState("");
    const [signemail, setSignemail] = useState("");
    const [signpassword, setSignpassword] = useState("");
    const [signcpassword, setSigncpassword] = useState("");
    const [signname, setSignname] = useState("");

    const onchange = (e) => {
        if (e.target.name === "logemail") {
            setLogemail(e.target.value);
        }
        else if (e.target.name === "logpassword") {
            setLogpassword(e.target.value);
        }
        else if (e.target.name === "signemail") {
            setSignemail(e.target.value);
        }
        else if (e.target.name === "signpassword") {
            setSignpassword(e.target.value);
        }
        else if (e.target.name === "signcpassword") {
            setSigncpassword(e.target.value);
        }
        else {
            setSignname(e.target.value);
        }
    }

    const startLoading = (meth) => {
        const loginButton = document.querySelector('.button');
        let dots = 0;
        loadingInterval = setInterval(() => {
            if (dots >= 5) {
                dots = 0;
            }
            loginButton.textContent = `${meth}${'.'.repeat(dots)}`;
            dots++;
        }, 500);
    }
    const stopLoading = (meth) => {
        clearInterval(loadingInterval);
        const loginButton = document.querySelector('.button');
        loginButton.textContent = `${meth}`;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        startLoading("Login");
        try {
            const response = await fetch(`${props.apiHost}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": logemail, "password": logpassword })
            });
            const json = await response.json();
            if (json.success) {
                //redirect
                stopLoading("Login");
                localStorage.setItem('token', json.authtoken);
                navigate('/');
            }
            else {
                stopLoading("Login");
                toast.error(json.error, {
                    theme: "colored",
                    autoClose: 3000
                })
            }
        }
        catch (err) {
            stopLoading("Login");
            toast.error("Some error occured please try after some time", {
                theme: "colored",
                autoClose: 3000
            })
        }
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        if (signcpassword === signpassword) {
            startLoading("Signup");
            const response = await fetch(`${props.apiHost}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "name": signname, "email": signemail, "password": signpassword })
            });
            const json = await response.json();
            if (json.success) {
                //redirect
                stopLoading("Signup");
                localStorage.setItem('token', json.authtoken);
                navigate('/')
            }
            else {
                stopLoading("Signup");
                toast.error(json.error, {
                    theme: "colored",
                    autoClose: 3000
                })
            }
        }
        else {
            toast.error("Password should be equal", {
                theme: "colored",
                autoClose: 3000
            })
        }
    }

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    <div className="form-group">
                                                        <input type="email" name="logemail" className="form-style"
                                                            placeholder="Your Email" id="logemail" autoComplete="off" value={logemail} onChange={onchange} required={true} />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="logpassword" className="form-style"
                                                            placeholder="Your Password" id="logpassword" autoComplete="current-password" value={logpassword} onChange={onchange} required={true} />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button className="btn mt-4 button" onClick={handleLogin}>Login</button>
                                                    {/* <p class="mb-0 mt-4 text-center"><a href="#0" class="link" style={{textDecoration:"none"}}>Forgot your password?</a></p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Sign Up</h4>
                                                    <div className="form-group">
                                                        <input type="text" name="signname" className="form-style"
                                                            placeholder="Your Full Name" id="signname" autoComplete="off" value={signname} onChange={onchange} required={true} />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email" name="signemail" className="form-style"
                                                            placeholder="Your Email" id="signemail" autoComplete="off" value={signemail} onChange={onchange} required={true} />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="signpassword" className="form-style"
                                                            placeholder="Your Password" id="signpassword" value={signpassword} onChange={onchange} autoComplete='current-password' required={true} minLength={5} />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="signcpassword" className="form-style"
                                                            placeholder="Confirm Password" id="signcpassword" value={signcpassword} onChange={onchange} autoComplete='current-password' required={true} minLength={5} />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button className="btn mt-4 button" onClick={handleSignup}>Signup</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth