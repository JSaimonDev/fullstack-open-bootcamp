import { createSlice } from '@reduxjs/toolkit'
const initialState = []
let unorderedState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      unorderedState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
      return unorderedState.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
      state.sort((a, b) => b.votes - a.votes)
    },
    initializeAnecdotes: (state, action) => {
      return action.payload
    }}
})


export default anecdoteSlice.reducer
export const {vote, initializeAnecdotes, appendAnecdote} = anecdoteSlice.actions