import { useDispatch, useSelector } from 'react-redux'
import noteService from '../services/notes'
import { initializeNotes } from '../reducers/notes'
import { setNotification } from '../reducers/notification'




const Note = ({ note }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch()

  const toggleImportance = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then(returnedNote => {
      dispatch(initializeNotes(notes.map(note => note.id !== id ? note : returnedNote)))
    })
      .catch(() => {
        dispatch(setNotification(
          `Note '${note.content}' was already removed from server`
        ))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
        dispatch(initializeNotes((notes.filter(n => n.id !== id))))
      })
  }

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
    <li className='note'>
      <div>
        <span>
          <strong>{note.content} / </strong>
        </span>
        <span>
          <small>{note.likes} likes</small>
        </span>
      </div>
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={() => handleLike(note.id)}>Like</button>
      <button onClick={() => handleRemove(note.id)}>Delete</button>
    </li>
  )
}

export default Note