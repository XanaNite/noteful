import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import MainNav from '../MainNav/MainNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NotePage from '../NotePage/NotePage';
import Main from '../Main/Main';
import {getNotesForFolder, findNote, findFolder} from '../note-functions'
import ApiContext from '../ApiContext';
import config from '../config';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
        fetch(`${config.API_ENDPOINT}/notes`),
        fetch(`${config.API_ENDPOINT}/folders`)
    ])
        .then(([notesRes, foldersRes]) => {
            if (!notesRes.ok)
                return notesRes.json().then(e => Promise.reject(e));
            if (!foldersRes.ok)
                return foldersRes.json().then(e => Promise.reject(e));

            return Promise.all([notesRes.json(), foldersRes.json()]);
        })
        .then(([notes, folders]) => {
            this.setState({notes, folders});
        })
        .catch(error => {
            console.error({error});
        });
}

handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
};

  renderNavRoutes() {
    const {notes, folders} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>(
          <Route
            exact
            key={path}
            path={path}
            render={routeProps =>(
              <MainNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route 
          path='/note/:noteId' 
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-note' component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    const {notes, folders} = this.state;
    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              const notesForFolder = getNotesForFolder(
                  notes,
                  folderId
              );
              return (
                  <Main
                      {...routeProps}
                      notes={notesForFolder}
                  />
              );
            }}
          />
        ))}
        <Route 
          path='/note/:noteId' 
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePage {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
    };
    return (
      <ApiContext.Provider value = {value}>
        <div className="App">
          <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <main className='App__main'>{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
