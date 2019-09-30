import React from 'react'
import './AddNote.css'

export default class AddNote extends React.Component{
    render(){
        return(
            <form className='AddNote'>
                <div className='AddNote__info'>
                    <div className='noteName'>
                        <label htmlFor='name'>Note Name:</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            className='addNote__name' />
                    </div>
                    <div className='noteContent'>
                    <label htmlFor='content'>Content:</label>
                    <input
                        type='text'
                        name='content'
                        id='content'
                        className='addNote__content' />
                    </div>
                </div>
                <div className='addNote__button__group'>
                    <button type='reset' className='addNote__button'>
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='addNote__button'
                    >
                        Save    
                    </button>
                </div>
            </form>
        )
    }
}