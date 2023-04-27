import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import  Notification from './components/Notification'
import { useEffect } from 'react'
import { getAll} from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initializeAnecdotesAsync } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getAll()
    .then(anecdotes => dispatch(initializeAnecdotesAsync(anecdotes)))
  }, [dispatch])


  return (
    <div>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App