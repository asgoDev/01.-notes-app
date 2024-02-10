import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getActualDate } from "../utils/date";
import "../styles/note-form.css";
import { FcCheckmark, FcEmptyTrash, FcPrevious } from "react-icons/fc";
import FormControlButton from "./FormControlButton";
import RadioColor from "./RadioColor";

function NoteForm() {
  const { formState, createNote, getNote, editNote, closeForm, deleteNote } =
    useContext(AppContext);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: getActualDate(),
    bg: "",
  });

  const [emptyForm, setEmptyForm] = useState(true);

  //control edition
  useEffect(() => {
    if (formState.noteId || formState.noteId === 0) {
      emptyForm && setFormValues(getNote(formState.noteId));
    } 
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

  const getRadioValue = (e) => {
    setFormValues((prevState) => {
      return { ...prevState, bg: e.target.value };
    });
    editMode();
  };

  const saveNote = (e) => {
    e.preventDefault();
    if (formValues.title == "" && formValues.description == "") return 0;
    let newNote = formatNoteValues(formValues);
    editNote();
    createNote(newNote);
  };

  const editMode = () => {
    if (formState.readOnly) editNote();
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
            onClick={editMode}
          />
          <div className="form__secondary-options">
            <fieldset
              // readOnly={formState.readOnly}
              className="form__note-colors"
            >
              <RadioColor
                name="color"
                value="turquoise"
                onChange={getRadioValue}
                checked={true}
              />
              <RadioColor
                name="color"
                value="blue"
                onChange={getRadioValue}
              />
              <RadioColor name="color" value="green" onChange={getRadioValue} />
              <RadioColor name="color" value="pink" onChange={getRadioValue} />
              <RadioColor
                name="color"
                value="violet"
                onChange={getRadioValue}
              />
              <RadioColor
                name="color"
                value="orange"
                onChange={getRadioValue}
              />
              <RadioColor name="color" value="red" onChange={getRadioValue} />
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
            onClick={editMode}
          ></textarea>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
