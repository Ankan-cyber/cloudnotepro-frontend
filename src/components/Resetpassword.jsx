import React, { useContext, useState, useEffect } from 'react'
import '../css/Login.css'
import noteContext from "../context/notes/noteContext"
import { useNavigate } from 'react-router-dom';

const Resetpassword = () => {

    const navigate = useNavigate()
    const context = useContext(noteContext);
    const { mailReset } = context;
    const [email, setemail] = useState("")
    document.title = "Reset Password - CLoudNote Pro"

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [])


    return (
        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Reset Password</h4>
                                                <div className="form-group">
                                                    <input type="email" name="email" className="form-style" id="email" autoComplete="off" required={true} value={email} onChange={(e) => { setemail(e.target.value) }} />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <button className="btn mt-4 button" onClick={() => { mailReset(email) }}>Reset</button>
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
    )
}

export default Resetpassword