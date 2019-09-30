import React from 'react';
import {Link} from 'react-router-dom';
import './Main.css';
import NoteInfo from '../NoteInfo/NoteInfo';
import CircleButton from '../CircleButton/CircleButton';
import ApiContext from '../ApiContext';
import {getNotesForFolder} from '../note-functions';
import PageError from '../PageError';

export default class Main extends React.Component{
    static defaultProps = {
        match: {
            params: {},
        },
    };
    static contextType = ApiContext;

    render(){
        const {folderId} = this.props.match.params;
        const {notes=[]} = this.context;
        const notesForFolder = getNotesForFolder(notes, folderId);
        return(
            <section className='Main'>
                <PageError>
                    <ul className='note-list'>
                        {notesForFolder.map(note =>
                            <li key={note.id}>
                                <NoteInfo 
                                    id={note.id}
                                    name={note.name}
                                    modified={note.modified}
                                />
                            </li>
                        )}
                    </ul>
                    <div className='Main__button-container'>
                        <CircleButton 
                            type='button' 
                            className='Main__add-note'
                            tag={Link}
                            to='/add-note'
                        >
                                + Note
                        </CircleButton>
                    </div>
                </PageError>
            </section>
        );
    }
}