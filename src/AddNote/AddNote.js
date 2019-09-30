import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

export default class AddNote extends React.Component{
    static contextType = ApiContext

    state = {
      error: null,
    };
  
    handleSubmit = e => {
      e.preventDefault()
      // get the form fields from the event
      const { name, content } = e.target
      const note = {
        name: name.value,
        content: content.value
      }
      this.setState({ error: null })
      fetch(config.API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${config.API_KEY}`
        }
      })
        .then(res => {
          if (!res.ok) {
            // get the error message from the response,
            return res.json().then(error => {
              // then throw it
              throw error
            })
          }
          return res.json()
        })
        .then(data => {
          name.value = ''
          content.value = ''
          this.context.addNote(data)
          this.props.history.push('/')
        })
        .catch(error => {
          this.setState({ error })
        })
    }
  
    handleClickCancel = () =>{
      this.props.history.push('/')
    }

    render(){
        const {error} = this.state

        return(
            <section className='AddNote'>
                <h2>Create a note</h2>
                <form className='AddNote__form' onSubmit={this.handleSubmit}>
                    <div className='AddNote__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
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
                        <textarea
                            type='text'
                            name='content'
                            id='content'
                            className='addNote__content' />
                        </div>
                    </div>
                    <div className='addNote__button__group'>
                        <button type='reset' className='addNote__button' onClick={this.handleClickCancel}>
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
            </section>
        )
    }
}