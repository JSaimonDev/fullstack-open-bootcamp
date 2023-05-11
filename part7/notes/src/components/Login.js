import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import loginService from '../services/login'
import noteService from '../services/notes'
import { setUsername, setPassword, resetLoginData } from '../reducers/login-data'
import { setUserSession } from '../reducers/user-session'
import { setNotification } from '../reducers/notification'


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
         username
          <input
            value={username}
            id='username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
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
      dispatch(setNotification(exception))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  return (
    <div>
      {!user &&
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
      }
    </div>
  )}

export default Login