import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getActualDate } from "../utils/date";
import "../styles/note-form.css";

function NoteForm() {
  const { formState, createNote, getNote, editNote, closeForm } =
    useContext(AppContext);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: getActualDate(),
  });

  //control edition
  useEffect(() => {
    if (formState.noteId) {
      setFormValues(getNote(formState.noteId));
    }
  }, []);

  const formatNoteValues = (noteData) => {
    let { title, description, id, date } = noteData;

    if (title) title.trim();
    if (description) title.trim();

    let actualDate = getActualDate();
    if (date != actualDate) date = actualDate;

    return { title, description, id, date };
  };

  const saveNote = (e) => {
    e.preventDefault();
    const newNote = formatNoteValues(formValues);
    createNote(newNote);
    editNote();
  };

  const comeBack = (e) => {
    e.preventDefault();
    if(!formState.readOnly) saveNote(e);
    closeForm();
  };

  return (
    <div className="form-view-bg">
      <div className="form-container">
        <header className="form-container__header">
          <button onClick={comeBack}>Volver</button>
          {formState.readOnly ? (
            <button onClick={editNote}>Editar</button>
          ) : (
            <button onClick={saveNote}>Guardar nota</button>
          )}
        </header>
        <form className="form">
          <input
            readOnly={formState.readOnly}
            className="form__title-input"
            type="text"
            placeholder="Título"
            value={formValues.title}
            onChange={(e) => {
              setFormValues({ ...formValues, title: e.target.value });
            }}
          />
          <div className="form__secondary-options">
            <fieldset
              readOnly={formState.readOnly}
              className="form__note-colors"
            >
              <input className="radio-color" type="radio" name="color" id="" />
              <input className="radio-color" type="radio" name="color" id="" />
              <input className="radio-color" type="radio" name="color" id="" />
              <input className="radio-color" type="radio" name="color" id="" />
              <input className="radio-color" type="radio" name="color" id="" />
            </fieldset>
            <span className="form__date">{formValues.date}</span>
          </div>
          <textarea
            readOnly={formState.readOnly}
            className="form__text-area"
            placeholder="Tengo que..."
            value={formValues.description}
            onChange={(e) => {
              setFormValues({ ...formValues, description: e.target.value });
            }}
          ></textarea>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
