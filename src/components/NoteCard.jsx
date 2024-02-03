import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/note-card.css";

function NoteCard({
  note = { title: "Sin título", description: "Sin descripción" },
}) {
  const { showNote } = useContext(AppContext);

  return (
    <li
      onClick={() => {
        showNote(note.id);
      }}
      className={`note-card bg-${note.bg || "blue"}`}
    >
      <h3 className="note-card__title">{note.title || "Sin título"}</h3>
      <p className="note-card__description">
        {note.description || "Sin descripción"}
      </p>
    </li>
  );
}

export default NoteCard;
