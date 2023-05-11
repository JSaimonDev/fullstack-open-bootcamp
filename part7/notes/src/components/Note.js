import { useSelector, useDispatch } from 'react-redux'
import noteService from '../services/notes'
import { initializeNotes, addComment } from '../reducers/notes'
import { useParams } from 'react-router-dom'
import { useState } from 'react'


const Note = () => {
  const notes = useSelector(state => state.notes)
  const id = useParams().id
  const note = notes.find(note => note.id === id )
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleLike = id => {
    const note = notes.find(n => n.id === id)
    console.log('note for like', note)
    const changedNote = { ...note, likes: note.likes + 1 }

    noteService.update(id, changedNote).then(returnedNote => {
      dispatch(initializeNotes(notes.map(note => note.id !== id ? note : returnedNote)))
    })
  }

  const handleRemove = id => {
    const note = notes.find(n => n.id === id)

    noteService.deleteNote(id, note).then(() => {
      dispatch(initializeNotes(notes.filter(n => n.id !== id)))
    })
  }

  const handleCommentChange = event => {
    setComment(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    noteService.postComment(note.id, comment)
    const id = note.id
    dispatch(addComment({ id, comment }))
    setComment('')
  }


  return (
    note ?
      <div>
        <ul>
          <li><h2>{note.content}</h2></li>
          <li>{note.likes} <button onClick={() => handleLike(note.id)}>Like</button></li>
          <li>added by {note.user.username}</li>
          <button onClick={() => handleRemove(note.id)}>Delete</button>
        </ul>
        <h3>Comments</h3>
        <form onSubmit={handleSubmit}>
          <input value={comment} onChange={handleCommentChange} />
          <button type="submit">Add comment</button>
        </form>
        <ul>
          {note.comments.map((comment, index) => <li key={note.id + 'comment' + index}>{comment}</li>)}
        </ul>
      </div>
      : null
  )
}

export default Note