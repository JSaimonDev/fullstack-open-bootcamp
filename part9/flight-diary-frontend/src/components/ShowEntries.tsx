import { Entry } from "../types"

interface ShowEntriesProps {
    entries: Entry[]
}

const ShowEntries = ({entries}: ShowEntriesProps) => {
    return (
    <div>
        {entries.map(entry => {
        return(
        <div>
          <h2>{entry.date}</h2>
          <p>{entry.weather}</p>
          <p>{entry.visibility}</p>
          <p>{entry.comment}</p>
        </div>)
      })}
    </div>
    )
}

export default ShowEntries