import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [navigate])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cpassword === password) {
      const response = await fetch(`${props.apiHost}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name, "email": email, "password": password })
      });
      const json = await response.json();
      if (json.success) {
        //redirect
        localStorage.setItem('token', json.authtoken);
        navigate('/')
      }
      else {
        toast.error(json.error, {
          theme: "light",
          autoClose: 3000
        })
      }
    }
    else {
      toast.error("Password should be equal", {
        theme: "light",
        autoClose: 3000
      })
    }
  }
  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    else if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    }
    else {
      setName(e.target.value);
    }
  }
  return (
    <>
      <div className="container my-4">
        <h2 className='my-4'>Signup to CloudNote Pro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={onchange} name="name" required={true} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={email} onChange={onchange} required={true} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={onchange} name="password" autoComplete='current-password' required={true} minLength={5} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" value={cpassword} onChange={onchange} name="cpassword" autoComplete='current-password' required={true} minLength={5} />
          </div>
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Signup