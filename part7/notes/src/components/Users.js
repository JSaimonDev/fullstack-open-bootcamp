import { useSelector } from 'react-redux'

const SingleUser = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.notes.length}</td>
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