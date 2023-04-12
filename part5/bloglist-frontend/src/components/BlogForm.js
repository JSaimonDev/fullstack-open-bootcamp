import { useState } from "react"
import { postBlog } from "../services/blogs"

const handleNewBlog = (newBlog, setNewBlog, addBlog) => {
    const updateBlog = postBlog(newBlog)
    addBlog(updateBlog)
    setNewBlog({title: "", author: "", url: ""})
  }


const BlogForm = ({setBlogs, blogs, addBlog}) => {
    const [newBlog, setNewBlog] = useState({title: "", author: "", url: ""})
    
    return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={() => handleNewBlog(newBlog, setNewBlog, addBlog)}>
        <div>
          title&nbsp;
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
          />
        </div>
        <div>
          author&nbsp;
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
          />
        </div>
        <div>
          url&nbsp;
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>)
  }

  export default BlogForm