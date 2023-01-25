import React, { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext"
import Notesitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const FetchNotes = (props) => {

    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, fetchNotes } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes()
        } else {
            navigate('/auth');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="row my-3">
            <h2 className="py-4">Your Notes</h2>
            {notes.length === 0 ? <h6>no notes to display add some notes first</h6> : notes.map((note) => {
                return <Notesitem key={note._id} note={note} editNote={props.editNote} />
            })}
        </div>
    )
}

export default FetchNotes