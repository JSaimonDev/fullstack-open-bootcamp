import { useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Users from './components/Users'
import noteService from './services/notes'
import { useSelector, useDispatch } from 'react-redux'
import { initializeNotes }  from './reducers/notes'
import { setUserSession } from './reducers/user-session'
import { initializeUserList } from './reducers/user-list'
import userListService from './services/user-list'
import { Routes, Route } from 'react-router-dom'
import UserNotes from './components/UserNotes'
import NotesList from './components/NotesList'
import NavBar from './components/NavBar'
import Login from './components/Login'
import { Container } from '@mui/material'



const App = () => {
  const dispatch = useDispatch()
  const notificationMessage = useSelector(state => state.notification)
  const notes = useSelector(state => state.notes)

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

  return (
    <Container>
      <NavBar />

      <h1>Notes app</h1>

      <Notification message={notificationMessage} />

      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserNotes/>} />
        <Route path="/notes/:id" element={<Note />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App
