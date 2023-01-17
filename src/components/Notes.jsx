import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import Notesitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div className="row my-3">
            <h2 className="py-4">Your Notes</h2>
            {notes.map((note) => {
                return <Notesitem key={note._id} note={note}/>
            })}
        </div>
    )
}

export default Notes