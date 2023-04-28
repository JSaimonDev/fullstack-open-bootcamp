import { createNew } from '../request'
import { useMutation, useQueryClient } from 'react-query'

const AnecdoteForm = () => {
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
