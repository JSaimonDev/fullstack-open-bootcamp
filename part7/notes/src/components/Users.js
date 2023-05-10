import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleUser = ({ user }) => {
  return (
    <tr>
      <Link to={`/users/${user.id}`}>
        <td>{user.name}</td>
        <td>{user.notes.length}</td>
      </Link>
    </tr>
  )}

const Users = () => {
  const userList = useSelector(state => state.userList)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <td>blogs created</td></tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <SingleUser key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users