import { ALL_BOOKS } from "../Queries"
import { useQuery } from "@apollo/client"
import { useContext } from "react"
import FavoriteContext from "../context/favoriteContext"

const Recommend = (props) => {
    const result = useQuery(ALL_BOOKS)
    const [ favorite ] = useContext(FavoriteContext)

    if (!props.show) {
        return null
    }

return (
    <div>
    <h2>recommendations</h2>
    <p>books in your favorite genre <strong>{favorite}</strong></p>
    <table>
        <tbody>
        <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
        </tr>
            {result.data.allBooks.map((a) => {
            if (a.genres.includes(favorite)) {
                return (
                <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                </tr>
                )}
                return null
            })
            }
        </tbody>
    </table>
    </div>
)
}

export default Recommend