const blogsRouter = require('express').Router()
const { Blog } = require('../models/blog')
const { User } = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.status(200).json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const user = await User.findById(req.body.user)
  console.log(user)
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
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  const postBlog = await blog.save()
  res.status(201)
  res.json(postBlog)
})

module.exports = blogsRouter
