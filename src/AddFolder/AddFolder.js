import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError'
import './AddFolder.css'

export default class AddFolder extends React.Component{
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
      const { name } = e.target
      const folder = {
        name: name.value,
      }
      console.log('name: ', name.value)
      this.setState({ error: null })
      fetch(`${config.API_ENDPOINT}/folders`, {
        method: 'POST',
        body: JSON.stringify(folder),
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
          this.context.addFolder(data)
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
        const { error } = this.state
        const nameError = this.validateName()

        return(
            <section className='AddFolder'>
                <h2>Add a folder</h2>
                <form className='AddFolder__form' onSubmit={this.handleSubmit}>
                    <div className='AddFolder__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div className='folderName'>
                        <label htmlFor='name'>Folder Name:</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            className='addFolder__name'
                            onChange={e => this.updateName(e.target.value)} />
                            {this.state.name.touched && (
                                <ValidationError message={nameError} />
                            )}
                    </div>
                    <div className='addFolder__button__group'>
                        <button type='reset' className='addFolder__button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='addFolder__button'
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