import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserNotes = () => {
  const notes = useSelector(state => state.notes)
  const id = useParams().id
  const user = useSelector(state => state.userList.find(user => user.id === id))
  console.log('user', user)
  const userNotes = notes.filter(note => note.user.id === id)

  return (
    user ?
      <div>
        <h2>{user.name}</h2>
        <h3>added notes</h3>
        { userNotes ?
          <ul>
            {userNotes.map(note => (
              <li key={note.id}>{note.content}</li>
            ))}
          </ul>
          : null }
      </div>
      : null
  )
}

export default UserNotes