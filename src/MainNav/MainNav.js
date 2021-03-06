import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MainNav.css';
import CircleButton from '../CircleButton/CircleButton';
import { countNotesForFolder } from '../note-functions'
import ApiContext from '../ApiContext';

export default class MainNav extends React.Component{
    static contextType = ApiContext;

    render(){
        const {folders=[], notes=[]} = this.context;

        console.log(folders)

        return(
            <div className='MainNav'>
                <ul className='MainNav__folder-list'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='MainNav__folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                <span className='MainNav__folder-notes'>
                                    {countNotesForFolder(notes, folder.id)}
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
        );
    }
}

MainNav.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string,
        modified: PropTypes.string,
    })),
    folders: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })),

}