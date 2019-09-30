import React from 'react';
import PropTypes from 'prop-types';
import './NotePage.css';
import NoteInfo from '../NoteInfo/NoteInfo';
import ApiContext from '../ApiContext';
import {findNote} from '../note-functions';
import PageError from '../PageError';

export default class NotePage extends React.Component{
    static defaultProps = {
        match: {
            params: {},
        },
    };
    static contextType = ApiContext;

    handleDeleteNote = noteId =>{
        this.props.history.push('/');
    }

    render(){
        const {notes=[]} = this.context;
        const {noteId} = this.props.match.params;
        const note = findNote(notes, noteId) || {content: ''};
        return(
            <section className='MainNotePage'>
                <PageError>
                    <NoteInfo 
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                        onDeleteNote={this.handleDeleteNote}
                    />
                    <div className='NotePage__content'>
                        {note.content.split(/\n \r|\n/).map((para, i) =>
                            <p key={i}>{para}</p>
                        )}
                    </div>
                </PageError>
            </section>
        );
    }
}

NotePage.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string,
        modified: PropTypes.string,
    })),
}