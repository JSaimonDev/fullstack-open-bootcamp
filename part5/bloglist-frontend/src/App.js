import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { getAll } from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/toggleable";
import BlogForm from "./components/BlogForm";
import { tokenLogin } from "./services/login";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('logged user')
    if(loggedUserJSON){
      const tokenUser = JSON.parse(loggedUserJSON)
    tokenLogin(tokenUser.token)
    .then(response => {
      setUser(response)
      setToken(`Bearer ${response.token}`)
    }).catch(error => console.error(error))
    }
  },[])

  useEffect(() => {
    if (token) getAll(token).then((blogs) => setBlogs(blogs));
  }, [token]);

  const handleLogout = (setUser) => {
    window.localStorage.removeItem('logged user')
    setUser(null)
  }

  const addBlog = (newBlog) => {  
    setBlogs(blogs.concat(newBlog))
  }

  const showBlogs = () => {
    return(
    <div >
    <h2>blogs</h2>
    <div>{user.username} &nbsp; logged in &nbsp; <button onClick = {() => handleLogout(setUser)}>Logout</button></div>
    {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} token={token}/>
    ))}
  </div>
  )
  }


  return (
    <div>
      {user ? 
      <div>
        {showBlogs()}
        <Toggleable buttonShow={'Create new blog'} buttonHide={'Cancel'}>
          <BlogForm setBlogs={setBlogs} blogs={blogs} addBlog={addBlog} token={token}/>
          </Toggleable>
      </div>:
      <LoginForm errorMessage={errorMessage} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setErrorMessage={setErrorMessage} setUser={setUser} setToken={setToken}/> 
      }
    <button onClick={ () => console.log(user)}>Show user</button>
    </div>
  );
};

export default App;
