const blogsRouter = require('express').Router()
const { Blog } = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.status(200).json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  if (!blog.likes) blog.likes = 0
  if (!blog.title || !blog.url) return res.status(400).end()
  const postBlog = await blog.save()
  res.status(201)
  res.json(postBlog)
})

module.exports = blogsRouter
