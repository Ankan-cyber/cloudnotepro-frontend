import React, { useEffect, useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Account = () => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { getUser, user, changePassword } = context;
    const [changedetail, setChangedetail] = useState({ name: "", oldpassword: "", newpassword: "", cnewpassword: "" })
    useEffect(() => {
        if (localStorage.getItem('token')) {
            document.title = "Account - CLoudNote Pro"
            getUser()
        } else {
            navigate('/auth');
        }
    }, [navigate, getUser])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChangedetail({ ...changedetail, [name]: value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        if (changedetail.newpassword !== changedetail.cnewpassword) {
            toast.error("Password should be equal", {
                theme: "colored",
                autoClose: 3000
            })
        }
        else {
            changedetail.name === "" ? setChangedetail({ ...changedetail, name: user.name }) : setChangedetail({ ...changedetail })
            changePassword(changedetail.name, changedetail.oldpassword, changedetail.newpassword)
        }


    }
    return (
        <>
            <h3 className='my-4'>Update Your Account</h3>
            <form className='mb-4' onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" placeholder={user.name} name="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email (cannot be updated)</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" disabled={true} value={user.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="oldpassword" className="form-label"> Current Password</label>
                    <input type="password" className="form-control" id="oldpassword" name='oldpassword' onChange={handleChange} required={true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="newpassword" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="newpassword" name='newpassword' onChange={handleChange} required={true} minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cnewpassword" className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" id="cnewpassword" name='cnewpassword' onChange={handleChange} required={true} minLength={5} />
                </div>
                <button type="submit" id="accountbtn" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Account