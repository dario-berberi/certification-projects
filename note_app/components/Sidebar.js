import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                {/**gjejme vetem linjen e pare te note edhe e vendosim si titull */}
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                {/**per te kaluar parametra tek objektet kur i kalojme vete si argumenta ne nje component
                 * mjafton te perodim arrow functions ose te inicializojme nje function i cili theret 
                 * fuction qe kemi inicializuar me pare edhe tani mund ti kalojme parametrat qe duam
                 */}
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
