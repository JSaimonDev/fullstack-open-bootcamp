import { useSelector, useDispatch } from "react-redux"
import {voteAction} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAction(id))
      }

    const filterAnecdotes = (filter) => {
        return anecdotes.filter(anecdote => anecdote.votes >= filter)
    }

    const filteredAnecdotes = filterAnecdotes(filter)

    return (
        <div>
         <h2>Anecdotes</h2>
         {filteredAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>)}
        </div>
      )
}

export default AnecdoteList
    