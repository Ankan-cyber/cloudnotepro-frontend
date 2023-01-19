import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Notesitem = (props) => {
    const { note, editNote } = props
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-pen-to-square" style={{ color: "#0d6efd" }} onClick={()=>{editNote(note)}}></i>
                    <i className="fa-solid fa-trash" style={{ color: "red", marginLeft: "16px" }} onClick={() => { deleteNote(note._id) }}></i>
                </div>
            </div>
        </div>
    )
}

export default Notesitem