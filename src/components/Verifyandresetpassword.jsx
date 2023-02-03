import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext"
import { toast } from 'react-toastify';


const Verifyandresetpassword = (props) => {

    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { resetPassword } = context

    const [token, setToken] = useState("");
    const [tokenValidated, setTokenvalidated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserid] = useState("");
    const [newpassword, setNewpassword] = useState("")
    const [cnewpassword, setCnewpassword] = useState("")



    const verifyMail = useCallback(
        async (tokenDirect) => {
            const response = await fetch(`${props.apiHost}/api/auth/verify?token=${tokenDirect}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            if (json.success) {
                setTokenvalidated(true);
                setUserid(json.data.user.id)
                setLoading(false)
                document.title = "Reset Password - CLoudNote Pro"
            }
            else {
                setTokenvalidated(false);
                setLoading(false)
                document.title = "Invalid Token - CLoudNote Pro"
            }
        },
        [props.apiHost]
    );

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
        else {
            const searchParams = new URLSearchParams(window.location.search);
            const tokenValue = searchParams.get("token");
            setToken(tokenValue);
            if (tokenValue === "") {
                navigate('/')
            }
            verifyMail(tokenValue)
        }
    }, [navigate, verifyMail]);


    const handleClick = (e) => {
        e.preventDefault();
        if (newpassword === cnewpassword) {
            resetPassword(userId, token, newpassword)
        }
        else {
            toast.error("Password should be equal", {
                theme: "colored",
                autoClose: 3000
            })
        }
    }
    const handleChange = (e) => {
        if (e.target.name === "newpassword") {
            setNewpassword(e.target.value)
        }
        else {
            setCnewpassword(e.target.value)
        }
    }
    return (
        <div>
            {loading ? "" :
                <>
                    {!tokenValidated ? <h1 className="m-4" style={{ height: "70vh" }}>Token is invalid or has expired</h1> :
                        <div style={{ height: "75vh" }}>
                            <h3 className='my-4'>Reset Account Password</h3>
                            <form className='mb-4' onSubmit={handleClick}>
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
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default Verifyandresetpassword