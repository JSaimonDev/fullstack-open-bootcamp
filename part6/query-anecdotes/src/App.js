import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, update } from './request'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const result = useQuery('anecdotes', () => getAll())
  const updateMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }})
  const anecdotes = result.data

  if (result.isLoading) {
    return <div>Loading...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems with the server</div>
  }



  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type: 'SET_NOTIFICATION', message: `you voted '${anecdote.content}'`})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR_NOTIFICATION'})
    }
    , 5000)
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
