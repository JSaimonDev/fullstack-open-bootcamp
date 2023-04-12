import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { getAll, setToken, postBlog } from "./services/blogs";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBLog] = useState({title: "", author: "", url: ""})

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('logged user')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
    setUser(user)
    setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await login.login({
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

  const handleLogout = () => {
    window.localStorage.removeItem('logged user')
    setUser(null)
  }

  const handleNewBlog = () => {
    const updateBlog = postBlog(newBlog)
    setBlogs(blogs.concat(updateBlog))
    setNewBLog({title: "", author: "", url: ""})
  }

  const loginForm = () => (
    <div>
        <h2>log in to application</h2>
        <div>{errorMessage}</div>
        <form onSubmit={handleLogin}>
          <div>
            username&nbsp;
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password&nbsp;
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
  )

  const newBlogForm = () => (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title&nbsp;
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBLog({...newBlog, title: target.value})}
          />
        </div>
        <div>
          author&nbsp;
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBLog({...newBlog, author: target.value})}
          />
        </div>
        <div>
          url&nbsp;
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBLog({...newBlog, url: target.value})}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )


  const showBlogs = () => {
    return(
    <div>
    <h2>blogs</h2>
    <div>{user.username} &nbsp; logged in &nbsp; <button onClick={handleLogout}>Logout</button></div>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
  )
  }


  return (
    <div>
      {user ?
      <div>
        {showBlogs()}
        {newBlogForm()}
      </div>:
      loginForm()
      }
    <button onClick={ () => console.log(user)}>Show user</button>
    </div>
  );
};

export default App;
