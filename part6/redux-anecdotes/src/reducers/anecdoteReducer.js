import { createSlice } from '@reduxjs/toolkit'
import { createNew } from '../services/anecdotes'
import { getAll, update } from '../services/anecdotes'
const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload.id
      const anecdoteToVote = state.find(a => a.id === id)
      console.log(anecdoteToVote)
      anecdoteToVote.votes += 1
      state.sort((a, b) => b.votes - a.votes)
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
export const {vote, initializeAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const createAnecdote = (content) => {
    return async dispatch => {
        const response = await createNew (content)
        dispatch(appendAnecdote(response))
    }
}

export const initializeAnecdotesAsync = () => {

    return async dispatch => {
        const response = await getAll()
        dispatch(initializeAnecdotes(response))
    }
}

export const voteAnecdoteAsync = (id, currentState) => {
  const anecdoteToVote = currentState.find(a => a.id === id)
  const votedAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1
  }
    return async dispatch => {
        const response = await update(id, votedAnecdote)
        dispatch(vote(response))
    }
}