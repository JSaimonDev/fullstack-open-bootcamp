import Toggleable from "./toggleable"
import {updateBlog, deleteBlog } from "../services/blogs"



const Blog = ({blog, setBlogs, blogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (blog, blogs) => {
    const newBlog = {...blog, likes: blog.likes + 1}
    const blogIsUpdated = await updateBlog(newBlog.id, newBlog)
    if (blogIsUpdated){
      const updatedBlogs = blogs.map((blog) => blog.id === blogIsUpdated.id ? blogIsUpdated : blog)
      setBlogs(updatedBlogs)
    } 
  }

  const handleDelete = async (blog) => {
    const deleteStatus = await deleteBlog(blog.id)
    if (deleteStatus === 204){
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs(updatedBlogs)
    }
    else {
      console.log('error deleting blog')
    }
  }

  

  return (
  <div style={blogStyle}>
    <Toggleable buttonShow={'Show blog'} buttonHide={'Hide blog'}>{blog.title} &nbsp; <button onClick={() => handleDelete(blog)}>Delete</button><br />{blog.url}<br />{blog.likes}<button onClick={()=>handleLike(blog, blogs)}>like</button><br />{blog.author}<br /></Toggleable>
  </div>  )
}

export default Blog