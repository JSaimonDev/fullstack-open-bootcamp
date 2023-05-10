import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'
import { setNotification } from './reducers/notification'
import { useSelector, useDispatch } from 'react-redux'
import { initializeNotes, createNew }  from './reducers/notes'
import { setUserSession } from './reducers/user-session'
import { initializeUserList } from './reducers/user-list'
import userListService from './services/user-list'
import { Routes, Route } from 'react-router-dom'
import UserNotes from './components/UserNotes'
import NotesList from './components/NotesList'



const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notificationMessage = useSelector(state => state.notification)
  const notes = useSelector(state => state.notes)

  const user = useSelector(state => state.userSession)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserSession(user))
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        dispatch(initializeNotes(initialNotes))
      })
  }, [])

  useEffect(() => {
    userListService.getAll().then(users => dispatch(initializeUserList(users)))
  }, [notes])

  const noteFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('user', user)
      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      dispatch(setUserSession(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification(exception))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        dispatch(createNew(returnedNote))
        noteFormRef.current.toggleVisibility()
        dispatch(setNotification(
          `a new note '${noteObject.content}' created`
        ))
      })
  }

  const NotesUsersList = () => (
    <div>
      <NotesList />
      <Users />
    </div>
  )

  return (
    <div>
      <h1>Notes app</h1>

      <Notification message={notificationMessage} />

      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      }

      <Routes>
        <Route path="/" element={<NotesUsersList />} />
        <Route path="/users/:id" element={<UserNotes/>} />
        <Route path="/notes/:id" element={<Note />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
