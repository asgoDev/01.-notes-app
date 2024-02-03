import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import NoteCard from "./NoteCard";
import "../styles/note-list.css";

function NoteList() {
  const { noteList } = useContext(AppContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(noteList.toReversed())
  }, [noteList]);

  if (!noteList || noteList.length === 0) return <h2>No tienes notas aún</h2>;

  return <ul className="note-list">{list.map((note) => <NoteCard key={note.id} note={note} />)}</ul>;
}

export default NoteList;
