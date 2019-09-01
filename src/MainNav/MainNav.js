import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './MainNav.css';
import CircleButton from '../CircleButton/CircleButton';

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderId === folderId).length

export default function MainNav(props){
    return(
        <div className='MainNav'>
            <ul className='MainNav__folder-list'>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className='MainNav__folder-link'
                            to={`/folder/${folder.id}`}
                        >
                            <span className='MainNav__folder-notes'>
                                {countNotesForFolder(props.notes, folder.id)}
                            </span>
                            {folder.name}
                        </NavLink>
                    </li>
                )}
            </ul>
            <div className='MainNav__button-container'>
                <CircleButton
                  tag={Link}
                  to='/add-folder'
                  type='button'
                  className='MainNav__add-folder-button'
                >
                  + Folder
                </CircleButton>
            </div>
        </div>
    )
}

MainNav.defaultProps = {
    folders: [],
}