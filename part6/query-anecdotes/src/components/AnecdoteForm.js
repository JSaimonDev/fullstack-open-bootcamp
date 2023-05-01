import { createNew } from '../request'
import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation(createNew)
  const queryClient = useQueryClient()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content,{
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      }
    })
    content.length >= 5
    ? notificationDispatch({type: 'SET_NOTIFICATION', message: `you created '${content}'`})
    : notificationDispatch({type: 'SET_NOTIFICATION', message: `too short anecdote, must have at least 5 characters`})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR_NOTIFICATION'})
    }
    , 5000)  
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
