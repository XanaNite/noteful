import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError'
import './AddNote.css'

export default class AddNote extends React.Component{
    static contextType = ApiContext

    state = {
      error: null,
      name: {
        value: '',
        touched: false,
      },
    }

    updateName(name){
        this.setState({name:{value: name, touched: true}})
    }

    validateName(fieldValue) {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        }
    }
  
    handleSubmit = e => {
      e.preventDefault()
      // get the form fields from the event
      const { name, content, folder } = e.target
      const note = {
        name: name.value,
        content: content.value,
        folderId: folder.value,
        modified: new Date(),
      }
      this.setState({ error: null })
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${config.API_KEY}`
        }
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(error => {
              throw error
            })
          }
          return res.json()
        })
        .then(data => {
          name.value = ''
          content.value = ''
          folder.value = ''
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
        const {folders} = this.context
        const nameError = this.validateName();

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
                                className='addNote__name'
                                onChange={e => this.updateName(e.target.value)} />
                            {this.state.name.touched && (
                                <ValidationError message={nameError} />
                            )}
                        </div>
                        <div className='noteContent'>
                        <label htmlFor='content'>Content:</label>
                        <textarea
                            type='text'
                            name='content'
                            id='content'
                            className='addNote__content' />
                        </div>
                        <div className='noteFolder'>
                            <label htmlFor='folder'>Folder Name:</label>
                            <select
                                type='text'
                                name='folder'
                                id='folder'
                                className='addNote__folder'
                            >
                                {folders.map(folder =>{
                                    return(
                                    <option key={folder.id} id={folder.id}>{folder.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='addNote__button__group'>
                        <button type='reset' className='addNote__button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='addNote__button'
                            disabled={
                                this.validateName()
                            }
                        >
                            Save    
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}