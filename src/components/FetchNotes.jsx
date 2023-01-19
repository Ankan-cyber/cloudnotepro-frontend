import React, { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext"
import Notesitem from './Noteitem';

const FetchNotes = (props) => {

    const context = useContext(noteContext);
    const { notes, fetchNotes } = context;
    useEffect(() => {
        fetchNotes()
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