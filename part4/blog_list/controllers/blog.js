const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { Blog } = require('../models/blog')
const { User } = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    blogs ? res.status(200).json(blogs) : res.status(200).end()
  } catch (error) {
    console.error(error)
  }
})
blogsRouter.post('/', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(req.user)
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user._id
    })
    if (!blog.likes) blog.likes = 0
    if (!blog.title || !blog.url) return res.status(400).end()
    const postBlog = await blog.save()
    res.status(201)
    res.json(postBlog)
    user.blogs = user.blogs.concat(postBlog._id)
    await user.save()
  } catch (error) { console.error(error) }
})
blogsRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    console.log(req.params.id)
    console.log(decodedToken)
    if (decodedToken.id) {
      const blog = await Blog.findById(req.params.id)
      if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
        console.log('blog deleted')
      }
    }
  } catch {
    res.status(400).end()
  }
})
blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const postBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.status(201)
  res.json(postBlog)
})

module.exports = blogsRouter
