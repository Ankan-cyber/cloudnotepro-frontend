import React, { useContext, useRef, useState } from 'react'
import AddNote from './AddNote';
import FetchNotes from './FetchNotes';
import noteContext from '../context/notes/noteContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notes = () => {
    const context = useContext(noteContext);
    const { editNote } = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [oldnote, setOldnote] = useState({ id: "", oldtitle: "", olddescription: "", oldtag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setOldnote({ id: currentNote._id, oldtitle: currentNote.title, olddescription: currentNote.description, oldtag: currentNote.tag })
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (note.etitle !== oldnote.oldtitle || note.edescription !== oldnote.olddescription || note.etag !== oldnote.oldtag) {
            editNote(note.id, note.etitle, note.edescription, note.etag)
            refClose.current.click();
        }
        else {
            toast.error("Change Something to update", {
                theme: "colored",
                autoClose: 3000
            })
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#1f2029", color: "#c4c3ca" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary" disabled={note.etitle.length <= 3 && note.edescription.length <= 5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <FetchNotes editNote={updateNote} />
        </>
    )
}

export default Notes