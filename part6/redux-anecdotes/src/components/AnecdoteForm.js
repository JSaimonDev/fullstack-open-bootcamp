import { useDispatch } from "react-redux"
import { appendAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, hideNotification } from "../reducers/notificationReducer"
import { createNew } from "../services/anecdotes"


const AnecdoteForm = () => {

const dispatch = useDispatch()

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const response = await createNew (content)
        dispatch(appendAnecdote(response))
        dispatch(setNotification(`You created '${content}'`))
        setTimeout(() => {
            dispatch(hideNotification())
        } , 5000)
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