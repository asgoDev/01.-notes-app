import { useContext, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./styles/app.css";
import { AppContext } from "./context/AppContext";

function App() {
  const { formState, switchForm, openNoteId } = useContext(AppContext);

  // let x = 0 

  // if (!x) console.log('ejecuto');


  return (
    <div className="app-body">
      <header className="app-header"><h1 className="app-header__title">NOTELICIOUS</h1></header>
      <main>
        <NoteList />
        {formState.isVisible && <NoteForm></NoteForm>}
        <div className="floating-buttons-panel">
          <div className="movement-x-ratio">
            <button className="new-note-button" onClick={switchForm}>+</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
