import { ALL_BOOKS } from "../Queries"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  const [genreList, setGenreList] = useState(['all'])
  const [genreFilter, setGenreFilter] = useState('all')

  useEffect(() => {
    if(!result.data) return
    const genres = result.data.allBooks.map((book) => book.genres).flat()
    const uniqueGenres = ["all", ...new Set(genres)]
    setGenreList(uniqueGenres)
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => {
            if (genreFilter === 'all') {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
            }
            else if (a.genres.includes(genreFilter)) {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
            }
            return null
          })
          }
          <tr>
            <td>
              {genreList.map(genre => {
                return <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Books
