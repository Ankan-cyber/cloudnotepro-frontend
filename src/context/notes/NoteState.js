import NoteContext from "./noteContext";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([]);

    // Add a note
    const fetchNotes = async () => {

        //Api Call
        const response = await fetch(`${host}/api/notes/fetch`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNjZlMWFkYjgzZWU1MTc5MWEwYzA1In0sImlhdCI6MTY3NDAzNjAwMn0.LenvIfi2bc4r1LmJD24Q-4E_0j7QYfMs9CbWg_YsHZE'
            },
        });
        const json = await response.json();
        setNotes(json)
    }

    // Add a note
    const addNote = async (title, description, tag) => {

        //Api Call
        const response = await fetch(`${host}/api/notes/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNjZlMWFkYjgzZWU1MTc5MWEwYzA1In0sImlhdCI6MTY3NDAzNjAwMn0.LenvIfi2bc4r1LmJD24Q-4E_0j7QYfMs9CbWg_YsHZE'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        if (json.errors === undefined) {
            setNotes(notes.concat(json.savedNote))
            toast.success("Note Added Succesfully",{
                theme: "light",
                autoClose: 3000
            })
        }
        else {
            json.errors.map((e) => {
                return toast.error(e.msg, {
                    theme: "light",
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNjZlMWFkYjgzZWU1MTc5MWEwYzA1In0sImlhdCI6MTY3NDAzNjAwMn0.LenvIfi2bc4r1LmJD24Q-4E_0j7QYfMs9CbWg_YsHZE'
            },
        });
        const json = await response.json();
        toast.success(json.Success,{
            theme: "light",
            autoClose: 3000
        })
        let newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {

        //Api Call
        const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNjZlMWFkYjgzZWU1MTc5MWEwYzA1In0sImlhdCI6MTY3NDAzNjAwMn0.LenvIfi2bc4r1LmJD24Q-4E_0j7QYfMs9CbWg_YsHZE'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        if(json.updatedNote!==null){
            toast.success("Succesfully Edited Note",{
                theme: "light",
                autoClose: 3000
            })
        }

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

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;