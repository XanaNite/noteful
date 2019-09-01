import React from 'react';
import './NotePageNav.css';
import CircleButton from '../CircleButton/CircleButton';

export default function NotePageNav(props){
    return(
        <div className='NotePageNav'>
            <CircleButton 
                tag='button'
                role='link' 
                onClick={() => props.history.goBack()}
                className='NotePageNav__go-back'
            >
                Go Back
            </CircleButton>
            {props.folder && (
                <h3 className='NotePageNav__folder-name'>
                    {props.folder.name}
                </h3>
            )}
        </div>
    );
}

NotePageNav.defaultProps = {
    history: {
        goBack: () => {}
    }
}