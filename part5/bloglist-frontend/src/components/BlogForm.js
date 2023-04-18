import { useState } from "react"
import { postBlog } from "../services/blogs"

const handleNewBlog = async (event, newBlog, setNewBlog, addBlog) => {
    event.preventDefault()
    const updateBlog = await postBlog(newBlog)
    addBlog(updateBlog)
    setNewBlog({title: "", author: "", url: ""})
  }
  
const BlogForm = ({setBlogs, blogs, addBlog, submitMockHandler}) => {
    const [newBlog, setNewBlog] = useState({title: "", author: "", url: ""})
    
    return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={ submitMockHandler ? (event) => { submitMockHandler(newBlog); event.preventDefault()} : (event) => handleNewBlog(event, newBlog, setNewBlog, addBlog)}>
        <div>
          <label htmlFor="title-input">Title</label>
          <input
          id= "title-input"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
          />
        </div>
        <div>
          <label htmlFor="author-input">Author</label>
          <input
          id= "author-input"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
          />
        </div>
        <div>
          <label htmlFor="url-input">Url</label>
          <input
          id = "url-input"
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
          />
        </div>
        <button id='create-blog-button'type="submit">create</button>
      </form>
    </div>)
  }

  export default BlogForm