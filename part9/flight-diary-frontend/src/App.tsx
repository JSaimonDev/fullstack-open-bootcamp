import { useEffect, useState } from 'react'
import './App.css'
import { Entry } from "./types"
import ShowEntries from "./components/ShowEntries"
import { getEntries } from "./services/entryServices"
import NewEntryFrom from './components/NewEntryForm'
import Notification from './components/Notification'

function App() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [error, setError] = useState<string>("")
  
  useEffect(()=>{
    getEntries()
    .then(res => {
      setEntries(res.data)
      return res.data
    })
  },[])

  return (
    <div>
      <Notification message={error} />
      <NewEntryFrom setEntries={setEntries} entries={entries} setError={setError} />
      <ShowEntries entries={entries}/>
    </div>
  )
}

export default App
