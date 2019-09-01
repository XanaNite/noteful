import React from 'react';
import './NotePage.css';
import NoteInfo from '../NoteInfo/NoteInfo';

export default function NotePage(props){
    return(
        <section className='MainNotePage'>
            <NoteInfo 
                id={props.note.id}
                name={props.note.name}
                modified={props.note.modified}
            />
            <div className='NotePage__content'>
                {props.note.content.split(/\n \r|\n/).map((para, i) =>
                    <p key={i}>{para}</p>
                )}
            </div>
        </section>
    );
}

NotePage.defaultProps = {
    note: {
        content: '',
    }
}