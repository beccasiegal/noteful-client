import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'

export default class AddNote extends Component {
  static defaultProps = {
    folders: [],
  }
  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'onSubmit={this.handleSubmit}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
handleNoteSubmit = (event) => {
  event.preventDefault();
console.log("Hello")
  const newNote = JSON.stringify({
    title: this.state.name.value,
    folder_id: this.state.folderId.value,
    content: this.state.content.value,
  })

  fetch(`${config.API_ENDPOINT}/notes`,
  {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: newNote
  })
  .then(res => {
    if (!res.ok)
      return res.json().then(e => Promise.reject(e))
    return res.json()
  })
  .then(response => this.context.addNote(response))
  .then(
    this.props.history.push('/')
  )
  .catch(error => {
    alert(error.message)
  })
}
onsubmit= handleNoteSubmit;