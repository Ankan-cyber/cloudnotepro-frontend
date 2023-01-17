import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesHard = [
        {
            "_id": "63c66f70deb3g679bfb282df8",
            "user": "63c66e1adb83ee51791a0c05",
            "title": "Anom Notes",
            "description": "Example Note to test",
            "tag": "personal",
            "date": "2023-01-17T09:50:40.278Z",
            "__v": 0
        },
        {
            "_id": "63c66f70deb3s679bfb282df8",
            "user": "63c66e1adb83ee51791a0c05",
            "title": "Anom Notes",
            "description": "Example Note to test",
            "tag": "personal",
            "date": "2023-01-17T09:50:40.278Z",
            "__v": 0
        },
        {
            "_id": "63c66f70dfeb3679bfb282df8",
            "user": "63c66e1adb83ee51791a0c05",
            "title": "Anom Notes",
            "description": "Example Note to test",
            "tag": "personal",
            "date": "2023-01-17T09:50:40.278Z",
            "__v": 0
        },
        {
            "_id": "63c66f70dedbd3679bfb282df8",
            "user": "63c66e1adb83ee51791a0c05",
            "title": "Anom Notes",
            "description": "Example Note to test",
            "tag": "personal",
            "date": "2023-01-17T09:50:40.278Z",
            "__v": 0
        },
        {
            "_id": "63c66f70deb3679bfb282df8",
            "user": "63c66e1adb83ee51791a0c05",
            "title": "Anom Notes",
            "description": "Example Note to test",
            "tag": "personal",
            "date": "2023-01-17T09:50:40.278Z",
            "__v": 0
        },
        {
            "_id": "63c66f70deb36f79bfb282df8",
            "user": "63c66e1adb83ee51791a0c05",
            "title": "Anom Notes",
            "description": "Example Note to test",
            "tag": "personal",
            "date": "2023-01-17T09:50:40.278Z",
            "__v": 0
        },
        {
            "_id": "63c6700fbg29aff7d59a504b5",
            "user": "63c66e1adb83ee51791a0c05",
            "title": "Anom Notes 2",
            "description": "Example Note to test",
            "tag": "personal",
            "date": "2023-01-17T09:53:19.655Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesHard);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;