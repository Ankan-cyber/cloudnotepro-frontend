import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    let accountVisibility = false;

    const handleLogout = () => {
        localStorage.removeItem('token');
        document.getElementById("accountWindow").style.display = "none";
        accountVisibility = false;
        setTimeout(() => {
            navigate('/auth')
        }, 500);
    }
    const handleAccountLink = () => {
        document.getElementById("accountWindow").style.display = "none";
        accountVisibility = false;
        setTimeout(() => {
            navigate('/account')
        }, 300);
    }
    const handleAccount = () => {
        document.getElementById("account").addEventListener("click", function () {
            let buttonRect = this.getBoundingClientRect();
            let accountWindow = document.getElementById("accountWindow");
            accountWindow.style.top = (buttonRect.bottom + 10) + "px";
            accountWindow.style.left = ((buttonRect.left + buttonRect.width / 2) - 48) + "px";
            accountWindow.style.display = "block";
            accountWindow.style.transform = "translate(-50%, 0)";
        });

        if (accountVisibility) {
            document.getElementById("account").addEventListener("click", function () {
                document.getElementById("accountWindow").style.display = "none";
            });
            accountVisibility = false;
        }
        else {
            document.getElementById("account").addEventListener("click", function () {
                document.getElementById("accountWindow").style.display = "block";
            });
            accountVisibility = true;
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ paddingLeft: "15px" }}>CloudNotePro</Link>
                <ul className="navbar-nav d-flex flex-row">
                    <li className="nav-item">
                        {!localStorage.getItem('token') ?
                            '' : <img src="/account.svg" alt="account" id='account' className='mr-3' onClick={handleAccount} />}
                    </li>
                    <div id="accountWindow" style={{ display: "none" }}>
                        <i className="fa-regular fa-user px-2" /><Link to="" id="myAccountLink" onClick={handleAccountLink}>My Account</Link>
                        <br />
                        <i className="fa-solid fa-right-from-bracket px-2" /><Link to="" id="logoutLink" onClick={handleLogout}>Logout</Link>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar