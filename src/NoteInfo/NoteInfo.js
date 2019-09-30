import React from 'react';
import { Link} from 'react-router-dom';
import ApiContext from '../ApiContext'
import config from '../config'
import './NoteInfo.css';
import PageError from '../PageError';

export default class NoteInfo extends React.Component{
    static defaultProps = {
        onDeleteNote: () => {},
    }
    static contextType = ApiContext;

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res =>{
            if(!res.ok){
                return res.json().then(e => Promise.reject(e));
            }
            return res.json();
        })
        .then(() =>{
            this.context.deleteNote(noteId);
            this.props.onDeleteNote(noteId);
        })
        .catch(error =>{
            console.log({error});
        })
    }

    render(){
        const {name, id, modified} = this.props;
        return(
            <div className='Note'>
                <PageError>
                    <h2 className='Note__title'>
                        <Link to={`/note/${id}`}>
                            {name}
                        </Link>
                    </h2>
                    <button 
                        className='Note__delete' 
                        type='button'
                        onClick={this.handleClickDelete}
                    >
                        Delete Note
                    </button>
                    <div className='Note__modified_date'>{modified}</div>
                </PageError>
            </div>
        );
    }
}