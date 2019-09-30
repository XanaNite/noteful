import React from 'react'
import './AddNote.css'

export default class AddNote extends React.Component{
    render(){
        return(
            <form className='AddFolder'>
                <div className='folderName'>
                    <label htmlFor='name'>Folder Name:</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        className='addFolder__name' />
                </div>
                <div className='addFolder__button__group'>
                    <button type='reset' className='addFolder__button'>
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='addFolder__button'
                    >
                        Save    
                    </button>
                </div>
            </form>
        )
    }
}