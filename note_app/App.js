import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { data } from './data';
import Split from 'react-split';
import { nanoid } from 'nanoid';

export default function App() {
  const [notes, setNotes] = React.useState(
    /**perdorim local storage qe te ruajme notes nga me pare
     * Json.parse i kthen elementet nga string qe ruhen ne local storage ne json object
     * || e perdorim nese nuk kemi gje nje local storage edhe e incializojme state me epmty array[]
     * perdoim arrow function sepse duam nje lazy state qe mos behet call ne local sotorage per cdo change tek notes
     */
    () => JSON.parse(localStorage.getItem('notes')) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState((notes[0] && notes[0].id) || '');
  //per cdo ndryshim ruajme notes ne local storage
  React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // Put the most recently-modified note at the top
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }
  //event.stopPropagation sepse kur bejme clikc trash button klikohet edhe parent element
  //edhe react kerkon perseri note qe eshte fshire
  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && <Editor currentNote={findCurrentNote()} updateNote={updateNote} />}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
