import { createContext, useState, useEffect } from "react";
import { noteList as old, idRegister } from "../data/notesDB";
import { toggleBoolean } from "../utils/logicFx";
import { incrementValue } from "../utils/mathFx";

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [noteList, setNoteList] = useState([]);
  const [idCounter, setIdCounter] = useState(idRegister > 0 ? idRegister : 0);
  const [formState, setFormState] = useState({
    isVisible: false,
    readOnly: false,
    noteId: null,
  });

  useEffect(() => {
    setNoteList(old || []);
  }, []);

  // Control

  const generateId = () => {
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
    if (!newNote.title && !newNote.description) return;
    if (newNote.id || newNote.id === 0) return updateNote(newNote);
    // if noteData doesn't have id, generateNewOne
    newNote.id = generateId();
    setNoteList((prevList) => [...prevList, newNote]);
  };

  const deleteNote = (noteId) => {
    setNoteList(noteList.filter((note) => note.id != noteId));
  };

  const updateNote = (toUpdateNote) => {
    const targetId = toUpdateNote.id;
    const targetIndex = noteList.findIndex((note) => note.id == targetId);
    // aqui estaba el error. pendiente
    const newList = noteList.filter((note, i) => i != targetIndex);
    setNoteList([...newList, toUpdateNote]);
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
        noteId: id,
        isVisible: true,
        readOnly: true,
      };
    });
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
