import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import React, { MouseEvent, MouseEventHandler } from "react";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const Note = ({ note, className, onDeleteNoteClicked }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createUpdatedText: string;
  if (updatedAt > createdAt) {
    createUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createUpdatedText = "Created: " + formatDate(createdAt);
  }

  const deleteHandler = (e: any) => {
    onDeleteNoteClicked(note);
    e.stopPropagation();
  };

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete className="text-muted ms-auto" onClick={deleteHandler} />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
