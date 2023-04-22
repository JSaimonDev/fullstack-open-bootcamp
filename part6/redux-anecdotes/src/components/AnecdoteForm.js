import { useDispatch } from "react-redux"
import { createAnecdoteAction } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

const dispatch = useDispatch()

    const addNote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdoteAction(content))
      }

 return (
    <div>
    <h2>create new</h2>   
    <form onSubmit = {(event) => addNote(event)}>
    <div><input name='anecdote' /></div>
    <button>create</button>
    </form>
    </div>
    )
}

export default AnecdoteForm