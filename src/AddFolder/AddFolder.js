import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'

export default class AddFolder extends Component {
  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
handleFolderFormSubmit = (event) => {
  event.preventDefault();

  const newFolder = JSON.stringify({
    folder_name: this.state.name.value
  })

  fetch(`${config.API_ENDPOINT}/folders`,
  {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: newFolder
  })
  .then(res => {
    if (!res.ok)
      return res.json().then(e => Promise.reject(e))
    return res.json()
  })
  .then(response => this.context.addFolder(response))
  .then(
    this.props.history.push('/')
  )
  .catch(error => {
    alert(error.message)
  })
}
onsubmit=handleFolderFormSubmit;