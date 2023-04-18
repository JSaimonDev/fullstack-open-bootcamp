import loginService from "../services/login.js";

const LoginForm = ({errorMessage, username, setUsername, password, setPassword, setErrorMessage, setUser, setToken}) => (
    <div>
        <h2>log in to application</h2>
        <div>{errorMessage}</div>
        <form onSubmit={(event) => {handleLogin(event, username, password, setUser, setToken, setUsername, setPassword, setErrorMessage)}}>
          <div>
            username&nbsp;
            <input
            id='username-input'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password&nbsp;
            <input
            id='password-input'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
  )

  const handleLogin = async (event, username, password, setUser, setToken, setUsername, setPassword, setErrorMessage) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        'logged user', JSON.stringify(user)
      )
      setUser(user);
      setToken(user.token)
      setUsername("");
      setPassword("");
    }
    catch{
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  };

  export default LoginForm