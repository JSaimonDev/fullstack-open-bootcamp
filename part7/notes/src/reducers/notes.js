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
    }
  } })

export default noteSlice.reducer
export const { initializeNotes, createNew, toggleImportance } = noteSlice.actions