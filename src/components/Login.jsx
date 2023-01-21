import React, { useState } from 'react'
// import {useHistory} from 'react-router-dom'

const Login = () => {
    // let history = useHistory();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://192.168.0.101:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email":credentials.email, "password":credentials.password })
        });
        const json = await response.json();
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken); 
            // history.push("/");
        }
        else{
            console.log(json.error);
        }
    }
    const onchange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={credentials.password} onChange={onchange} autoComplete="current-password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login