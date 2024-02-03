import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getActualDate } from "../utils/date";
import "../styles/note-form.css";
import { FcCheckmark, FcEmptyTrash, FcPrevious } from "react-icons/fc";
import FormControlButton from "./FormControlButton";

function NoteForm() {
  const { formState, createNote, getNote, editNote, closeForm, deleteNote } =
    useContext(AppContext);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: getActualDate(),
  });

  const [emptyForm, setEmptyForm] = useState("");

  //control edition
  useEffect(() => {
    if (formState.noteId || formState.noteId === 0) {
      setFormValues(getNote(formState.noteId));
    } // pendiente
  }, [formState.readOnly]);

  useEffect(() => {
    !formValues.title && !formValues.description
      ? setEmptyForm(true)
      : setEmptyForm(false);
  }, [formValues]);

  const formatNoteValues = (noteData) => {
    let { title, description, id, date, bg } = noteData;
    if (title) title.trim();
    if (description) description.trim();
    let actualDate = getActualDate();
    if (date != actualDate) date = actualDate;
    return { title, description, id, date, bg };
  };

  const saveNote = (e) => {
    e.preventDefault();
    if (formValues.title == "" && formValues.description == "") return 0;
    let newNote = formatNoteValues(formValues);
    editNote();
    createNote(newNote);
  };

  const comeBack = (e) => {
    e.preventDefault();
    if (!formState.readOnly) saveNote(e);
    closeForm();
  };

  return (
    <div className="form-view-bg">
      <div className="form-container">
        <header className="form-container__header">
          <FormControlButton onClickFunction={comeBack} icon={<FcPrevious />} />

          {formState.readOnly ? (
            <FormControlButton
              onClickFunction={(e) => {
                deleteNote(formState.noteId);
                closeForm();
              }}
              icon={<FcEmptyTrash />}
            />
          ) : (
            <FormControlButton
              onClickFunction={saveNote}
              icon={<FcCheckmark />}
              disabled={emptyForm}
            />
          )}
        </header>
        <form
          className="form"
          onClick={() => {
            if (formState.readOnly) editNote();
          }}
        >
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
