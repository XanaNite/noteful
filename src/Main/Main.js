import React from 'react';
import {Link} from 'react-router-dom';
import './Main.css';
import NoteInfo from '../NoteInfo/NoteInfo';
import CircleButton from '../CircleButton/CircleButton';

export default function Main(props){
    return(
        <section className='Main'>
            <ul className='note-list'>
                {props.notes.map(note =>
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
        </section>
    );
}

Main.defaultProps = {
    notes: [],
}