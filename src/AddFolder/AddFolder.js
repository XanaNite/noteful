import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

export default class AddNote extends React.Component{
    static contextType = ApiContext

    state = {
      error: null,
    };
  
    handleSubmit = e => {
      e.preventDefault()
      // get the form fields from the event
      const { name } = e.target
      const folder = {
        name: name.value,
      }
      console.log('name: ', name.value)
      this.setState({ error: null })
      fetch(config.API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(folder),
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
          this.context.addfolder(data)
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
                            className='addFolder__name' />
                    </div>
                    <div className='addFolder__button__group'>
                        <button type='reset' className='addFolder__button' onClick={this.handleClickCancel}>
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
            </section>
        )
    }
}