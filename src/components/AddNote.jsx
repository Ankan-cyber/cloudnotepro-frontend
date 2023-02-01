import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import 'react-toastify/dist/ReactToastify.css';

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("tag").value = "";
        setNote({ title: "", description: "", tag: "default" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">
                <h2 className="py-4">Add Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" className="form-control" id="description" name="description" onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} placeholder="default" />
                    </div>
                    <button type="submit" className="btn " onClick={handleClick} disabled={note.title.length <= 3 && note.description.length <= 5}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote