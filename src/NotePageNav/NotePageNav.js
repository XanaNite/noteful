import React from 'react';
import './NotePageNav.css';
import CircleButton from '../CircleButton/CircleButton';
import ApiContext from '../ApiContext';
import {findFolder, findNote} from '../note-functions';

export default class NotePageNav extends React.Component{
    static defaultProps = {
        history: {
            goBack: () => {},
        },
        match: {
            params: {},
        },
    };
    static contextType = ApiContext;

    render(){
        const {notes, folders} = this.context;
        const {noteId} = this.props.match.params;
        const note = findNote(notes, noteId) || {};
        const folder = findFolder(folders, note.folderId);

        return(
            <div className='NotePageNav'>
                <CircleButton 
                    tag='button'
                    role='link' 
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__go-back'
                >
                    Go Back
                </CircleButton>
                {folder && (
                    <h3 className='NotePageNav__folder-name'>
                        {folder.name}
                    </h3>
                )}
            </div>
        );
    }
}