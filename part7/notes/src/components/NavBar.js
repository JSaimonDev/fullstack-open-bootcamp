import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Container, Button } from '@mui/material'
const NavBar = () => {
  const user = useSelector(state => state.userSession)

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload()
  }

  return (
    <AppBar postion='static'>
      <Container>
        <Toolbar>
          <Button color='inherit' component={Link} to='/'>Notes</Button>
          <Button color='inherit' component={Link} to='/users'>users</Button>
          {user
            ? <><em>{user.name} logged in</em> <Button onClick={handleLogOut} color='inherit' >logout</Button></>
            : <Button color='inherit' component={Link} to='/login'>login</Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar