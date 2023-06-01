import React, { useRef, useState } from 'react'
import { Entry } from "../types"
import { postEntry } from  "../services/entryServices"
import '../App.css'

interface NewEntryFormProps { 
    setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
    entries: Entry[],
    setError: React.Dispatch<React.SetStateAction<string>>,

}

const NewEntryFrom = ({setEntries, entries, setError}: NewEntryFormProps) => {
    const dateRef = useRef<HTMLInputElement>(null)
    const commentRef = useRef<HTMLTextAreaElement>(null)
    const [weather, setWeather] = useState("")
    const [visibility, setVisibility] = useState("")

    const handleSubmit = async(event: React.SyntheticEvent) => {
        event.preventDefault()
        const newEntry = {
            date: dateRef.current?.value,
            weather: weather,
            visibility: visibility,
            comment: commentRef.current?.value
        }
        try{
        const addedEntry = await postEntry(newEntry)
        setEntries([
            ...entries,
            addedEntry
        ])
        dateRef.current ? dateRef.current.value = '' : null
        commentRef.current ? commentRef.current.value = "" : null
        setWeather("")
        setVisibility("")

        }
        catch(e: unknown){
            const error = e as { response?: { data?: string } }
            if(error?.response?.data && typeof error?.response?.data === 'string') setError(error.response.data)
            else setError('Unknown Error')
            setTimeout(() => setError(''),5000)
        }
    }

    const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeather(e.target.value)
    }

    const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVisibility(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="newEntryBox">
            <h3>Date</h3>
            <input type="date" id="date" ref={dateRef}/>
            <h3>Weather</h3>
            <label htmlFor="sunny"> Sunny </label>
            <input type="radio" name="weather" value="sunny" id="sunny" checked={weather === "sunny"} onChange={handleWeatherChange}/>
            <label htmlFor="rainy"> Rainy </label>
            <input type="radio" name="weather" value="rainy" id="rainy" checked={weather === "rainy"} onChange={handleWeatherChange}/>
            <label htmlFor="cloudy"> Cloudy </label>
            <input type="radio" name="weather" value="cloudy" id="cloudy" checked={weather === "cloudy"} onChange={handleWeatherChange}/>
            <label htmlFor="stormy"> Stormy </label>
            <input type="radio" name="weather" value="stormy" id="stormy" checked={weather === "stormy"} onChange={handleWeatherChange}/>
            <label htmlFor="windy"> Windy </label>
            <input type="radio" name="weather" value="windy" id="windy" checked={weather === "windy"} onChange={handleWeatherChange}/>
            <h3> Visibility </h3>
            <label htmlFor="great">Great</label>
            <input type="radio" name="visibility" value="great" id="great" checked={visibility === "great"} onChange={handleVisibilityChange}/>
            <label htmlFor="good">Good</label>
            <input type="radio" name="visibility" value="good" id="good" checked={visibility === "good"} onChange={handleVisibilityChange}/>
            <label htmlFor="ok">Ok</label>
            <input type="radio" name="visibility" value="ok" id="ok" checked={visibility === "ok"} onChange={handleVisibilityChange}/>
            <label htmlFor="poor">Poor</label>
            <input type="radio" name="visibility" value="poor" id="poor" checked={visibility === "poor"} onChange={handleVisibilityChange}/>
            <br/>
            <label>
                Comment <textarea name="comment" ref={commentRef}/>
            </label>
            <br/>
            <button>Send</button>
        </form>
    )
}

export default NewEntryFrom