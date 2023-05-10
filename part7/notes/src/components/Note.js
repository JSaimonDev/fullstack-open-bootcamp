import { useSelector, useDispatch } from 'react-redux'
import noteService from '../services/notes'
import { initializeNotes } from '../reducers/notes'
import { useParams } from 'react-router-dom'

const Note = () => {
  const notes = useSelector(state => state.notes)
  const id = useParams().id
  const note = notes.find(note => note.id === id )
  const dispatch = useDispatch()

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

  return (
    <div>
      <ul>
        <li>{note.content}</li>
        <li>{note.likes} <button onClick={() => handleLike(note.id)}>Like</button></li>
        <li>added by {note.user.username}</li>
        <button onClick={() => handleRemove(note.id)}>Delete</button>
      </ul>
    </div>
  )
}

export default Note