import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper, } from '@mui/material'

const SingleUser = ({ user }) => {
  return (
    <TableRow>

      <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
      <TableCell>{user.notes.length}</TableCell>

    </TableRow>
  )}

const Users = () => {
  const userList = useSelector(state => state.userList)

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell></TableRow>
          </TableHead>
          <TableBody>
            {userList.map(user => (
              <SingleUser key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users