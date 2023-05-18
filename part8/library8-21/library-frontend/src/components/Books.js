import { ALL_BOOKS } from "../Queries"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all')
  let queryVariables = {}
  if (genreFilter !== 'all') {
  queryVariables = { genre: genreFilter };
  }

  const result = useQuery(ALL_BOOKS, {
    variables: queryVariables
  })

  const [genreList, setGenreList] = useState(['all'])

  useEffect(() => {
    if(!result.data) return
    const newGenres = result.data.allBooks.map((book) => book.genres).flat()
    const genres = genreList.concat(newGenres)
    const uniqueGenres = [...new Set(genres)]
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
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
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
