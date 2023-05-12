import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import loginService from '../services/login'
import noteService from '../services/notes'
import { setUsername, setPassword, resetLoginData } from '../reducers/login-data'
import { setUserSession } from '../reducers/user-session'
import { setNotification } from '../reducers/notification'
import { TextField, Button } from '@mui/material'


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {

  const padding = {
    padding: 5
  }

  return (
    <div style={padding}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={padding}>
        <div  style={padding}>
         username
          <TextField
            defaultValue={username}
            id='username'
            onChange={handleUsernameChange}
            style={padding}
          />
        </div>
        <div style={padding}>
          password
          <TextField
            type="password"
            id='password'
            defaultValue={password}
            onChange={handlePasswordChange}
            style={padding}
          />
        </div>
        <Button variant="contained" id="login-button" type="submit" style={padding}>login</Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

const Login = () => {
  const user = useSelector(state => state.userSession)
  const username = useSelector(state => state.loginData.username)
  const password = useSelector(state => state.loginData.password)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('user', user)
      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      dispatch(setUserSession(user))
      dispatch(resetLoginData())
    } catch (exception) {
      dispatch(setNotification(exception.message))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  const handleUsernameChange  = (event) => {
    dispatch(setUsername(event.target.value))
  }

  const handlePasswordChange  = (event) => {
    dispatch(setPassword(event.target.value))
  }


  return (
    <div>
      {!user &&
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin}
        />
      </Togglable>
      }
    </div>
  )}

export default Login