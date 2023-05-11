import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const user = useSelector(state => state.userSession)

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload()
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to='/'>Notes</Link>
      <Link style={padding} to='/users'>users</Link>
      {user
        ? <><em>{user.name} logged in</em> <button onClick={handleLogOut}>logout</button></>
        : <Link style={padding} to='/login'>login</Link>
      }
    </div>
  )
}

export default NavBar