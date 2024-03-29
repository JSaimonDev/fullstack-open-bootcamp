import { useSelector, useDispatch } from "react-redux"
import { voteAnecdoteAsync } from '../reducers/anecdoteReducer'
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleClick = (id) => {
        dispatch(voteAnecdoteAsync(id, anecdotes))
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
            <button onClick={() => handleClick(anecdote.id)}>vote</button>
          </div>
        </div>)}
        </div>
      )
}

export default AnecdoteList
    