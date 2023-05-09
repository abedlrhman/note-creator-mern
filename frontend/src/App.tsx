import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((x) => x._id !== note._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Container>
      <Button
        className={`mb-4 ${stylesUtils.blackCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new note
      </Button>

      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              note={note}
              className={styles.note}
              onDeleteNoteClicked={deleteNote}
            />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onNoteSaved={(newNote) => {
            setNotes((prev) => prev.concat(newNote));
            setShowAddNoteDialog(false);
          }}
          onDismiss={() => setShowAddNoteDialog(false)}
        />
      )}
    </Container>
  );
}

export default App;
