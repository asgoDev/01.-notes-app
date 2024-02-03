import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import NoteCard from "./NoteCard";
import "../styles/note-list.css";

function NoteList() {
  const { noteList } = useContext(AppContext);

  console.log(noteList);
  if (!noteList) return <h2>No tienes notas aún</h2>;

  return (
    <ul className="note-list">
      {noteList.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ul>
  );
}

export default NoteList;
