import React from 'react';
import { Link} from 'react-router-dom';
import './NoteInfo.css';

export default function NoteInfo(props){
    return(
        <div className='Note'>
            <h2 className='Note__title'>
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <button className='Note__delete' type='button'>Delete Note</button>
            <div className='Note__modified_date'>{props.modified}</div>
        </div>
    );
}