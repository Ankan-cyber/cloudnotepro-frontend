import React, { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext"
import Notesitem from './Noteitem';
import AddNote from './AddNote';
const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchNotes } = context;
    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2 className="py-4">Your Notes</h2>
                {notes.map((note) => {
                    return <Notesitem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes