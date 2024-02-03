import { createContext, useState, useEffect } from "react";
import { noteList as old, idRegister } from "../data/notesDB";
import { toggleBoolean } from "../utils/logicFx";
import { incrementValue } from "../utils/mathFx";
import { info } from "autoprefixer";

export const AppContext = createContext();

export function AppContextProvider(props) {
  // future fetching fx

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(getNewId())
  //   }, 10000);
  // }, []);

  // states

  const [noteList, setNoteList] = useState(old || undefined);
  const [idCounter, setIdCounter] = useState(idRegister > 0 ? idRegister : 0);
  const [formState, setFormState] = useState({
    isVisible: false,
    readOnly: false,
    noteId: null,
  });

  // Control

  const getNewId = () => {
    let currentId = idCounter;
    updateIdCounter();
    return currentId;
  };

  const updateIdCounter = () => {
    setIdCounter((prevId) => incrementValue(prevId, 1));
  };

  // CRUD functions
  const createNote = (noteData) => {
    let newNote = { ...noteData };

    if (newNote.id) return updateNote(newNote);

    if (!newNote.title && !newNote.description) return;
    //pendiente
    if (!newNote.id && newNote.id != 0) newNote.id = getNewId();

    setNoteList((prevList) => [...prevList, newNote]);
  };

  const deleteNote = (noteId) => {
    setNoteList(noteList.filter((note) => note.id != noteId));
  };

  const updateNote = (toUpdateNote) => {
    const targetId = toUpdateNote.id;
    const targetIndex = noteList.findIndex((note) => note.id == targetId);
    const newList = noteList.filter((note) => note.id != targetIndex);
    newList.concat(toUpdateNote)
    setNoteList(newList);
  };
  // Interface functions

  const switchForm = () => {
    setFormState((prevState) => {
      return {
        ...prevState,
        isVisible: toggleBoolean(prevState.isVisible),
      };
    });
  };

  const showNote = (id) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        noteId: id,
      };
    });
    switchForm();
    editNote();
  };

  const editNote = () => {
    setFormState((prevState) => {
      return {
        ...prevState,
        readOnly: toggleBoolean(prevState.readOnly),
      };
    });
  };

  const closeForm = () => {
    setFormState({
      isVisible: false,
      readOnly: false,
      noteId: null,
    });
  };

  const getNote = (id) => noteList.find((note) => note.id == id);

  return (
    <AppContext.Provider
      value={{
        noteList,
        formState,
        createNote,
        deleteNote,
        switchForm,
        getNote,
        showNote,
        editNote,
        closeForm,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
