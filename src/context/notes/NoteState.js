import NoteContext from "./noteContext";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [user, setUser] = useState({ name: "", email: "" })

    // Add a note
    const fetchNotes = async () => {

        //Api Call
        const response = await fetch(`${host}/api/notes/fetch`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        if (json.success) {
            setLoaded(true)
            setNotes(json.notes)
        }
        else {
            setLoaded(true)
            toast.error("Some error occured please try after some time", {
                theme: "colored",
                autoClose: 3000
            })
        }
    }

    // Add a note
    const addNote = async (title, description, tag) => {

        //Api Call
        const response = await fetch(`${host}/api/notes/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        if (json.success) {
            setNotes(notes.concat(json.savedNote))
            toast.success("Note Added Succesfully", {
                theme: "colored",
                autoClose: 3000
            })
        }
        else {
            json.errors.map((e) => {
                return toast.error(e.msg, {
                    theme: "colored",
                    autoClose: 3000
                });
            })
        }
    }

    // Delete a Note
    const deleteNote = async (id) => {
        //Api Call
        const response = await fetch(`${host}/api/notes/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        if (json.success) {
            toast.success("Note has been deleted", {
                theme: "colored",
                autoClose: 3000
            })
            let newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
        }
        else {
            toast.error(json.msg, {
                theme: "colored",
                autoClose: 3000
            });
        }
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {

        //Api Call
        const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        if (json.success) {
            toast.success("Succesfully Edited Note", {
                theme: "colored",
                autoClose: 3000
            })
            let newNotes = JSON.parse(JSON.stringify(notes));
            //Logic to edit in client
            for (let i = 0; i < newNotes.length; i++) {
                const element = newNotes[i];
                if (element._id === id) {
                    newNotes[i].title = title;
                    newNotes[i].description = description;
                    newNotes[i].tag = tag;
                    break;
                }
            }
            setNotes(newNotes)
        }
        else {
            toast.error(json.msg, {
                theme: "colored",
                autoClose: 3000
            });
        }
    }

    //Get User Details
    const getUser = async () => {

        //Api Call
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if (json.success) {
            setUser({ name: json.user.name, email: json.user.email })
        }
        else {
            toast.error(json.msg, {
                theme: "colored",
                autoClose: 3000
            });
        }
    }

    //Get User Details
    const changePassword = async (name, oldpassword, newpassword) => {

        //Api Call
        const response = await fetch(`${host}/api/auth/changepassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, oldpassword, newpassword })
        });
        const json = await response.json();
        if (json.success) {
            document.getElementById('accountbtn').innerText = "Redirecting ..."
            toast.success(`${json.msg} Redirecting Now`, {
                theme: "colored",
                authClose: 3000
            });
            setTimeout(() => {
                localStorage.removeItem('token')
            }, 3000)
        }
        else {
            toast.error(json.msg, {
                theme: "colored",
                autoClose: 3000
            });
        }
    }
    //Send Reset Password Mail
    const mailReset = async (email) => {

        //Api Call
        const response = await fetch(`${host}/api/auth/mailreset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        const json = await response.json();
        if (json.success) {
            toast.success(`${json.msg}`, {
                theme: "colored",
                authClose: 3000
            });
        }
        else {
            toast.error(json.error, {
                theme: "colored",
                autoClose: 3000
            });
        }
    }
    //Send Reset Password Mail
    const resetPassword = async (id, token, password) => {

        //Api Call
        const response = await fetch(`${host}/api/auth/resetpassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, token, password })
        });
        const json = await response.json();
        if (json.success) {
            toast.success(`${json.msg}`, {
                theme: "colored",
                authClose: 3000
            });
        }
        else {
            toast.error(json.error, {
                theme: "colored",
                autoClose: 3000
            });
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes, loaded, getUser, user, changePassword, mailReset, resetPassword }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
