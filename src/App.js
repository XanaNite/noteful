import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import MainNav from './MainNav/MainNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePage from './NotePage/NotePage';
import Main from './Main/Main';
import dummystore from './dummy-store';

export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount(){
    setTimeout(() => this.setState(dummystore), 600);
  }

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
          render={routeProps =>{
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
            render={routeProps =>{
              const {folderId} = routeProps.match.params;
              const notesForFolder = getNotesForFolder(
                notes,
                folderId
              );
              return(
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
    return (
      <div className="App">
        <nav className='App__nav'>{this.renderNavRoutes()}</nav>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <main className='App__main'>{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
