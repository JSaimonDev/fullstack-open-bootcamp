import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import NoteForm from './NoteForm'
import noteService from '../services/notes'
import { createNew } from '../reducers/notes'
import { setNotification } from '../reducers/notification'
import { useRef } from 'react'
import { Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper, } from '@mui/material'

const NotesList = () => {
  const notes = useSelector(state => state.notes)
  const user = useSelector(state => state.userSession)
  const dispatch = useDispatch()

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

  const noteFormRef = useRef()
  return (
    <div>
      <h2>Notes</h2>
      {user &&
        <div>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      }

      <TableContainer component={Paper}>
        <Table>
          <TableBody>

            {notes.map(note =>
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`} >
                    {note.content}
                  </Link>
                </TableCell>
                <TableCell>
                  {note.user.name}
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )}

export default NotesList