import { ALL_AUTHORS, EDIT_AUTHOR } from "../Queries"
import { useQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  const onSubmit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: born } })
    setName(result.data.allAuthors[0].name)
    setBorn('')
  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  useEffect (() => {
    if (result.data) {
      setName(result.data.allAuthors[0].name)
    }
  }, [result.data])
  

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={onSubmit}>
        <div>
          <select value={name} onChange={handleChangeName}>
            {result.data.allAuthors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input type="number" value={born} onChange={({target}) => setBorn(parseInt(target.value))} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
