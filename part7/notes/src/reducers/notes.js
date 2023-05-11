import { createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    initializeNotes(state, action) {
      return action.payload
    },
    createNew(state, action) {
      return [...state, action.payload]
    },
    addComment(state, action) {
      const { id, comment } = action.payload
      console.log('id', id)
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        comments: noteToChange.comments.concat(comment)
      }
      return state.map(note => note.id !== id ? note : changedNote)
    }
  } })

export default noteSlice.reducer
export const { initializeNotes, createNew, toggleImportance, addComment } = noteSlice.actions