import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NotesList = () => {
  const notes = useSelector(state => state.notes)
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note =>
          <Link to={`/notes/${note.id}`} key={note.id}>
            {note.content}
          </Link>
        )}
      </ul>
    </div>
  )}

export default NotesList