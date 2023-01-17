import React from 'react'

const Notesitem = (props) => {
    const { note } = props
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-pen-to-square" style={{ color: "#0d6efd"}}></i>
                    <i className="fa-solid fa-trash" style={{ color: "red", marginLeft: "16px"}}></i>
                </div>
            </div>
        </div>
    )
}

export default Notesitem