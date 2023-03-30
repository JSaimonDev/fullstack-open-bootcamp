const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const blogsRouter = require('./controllers/blog')
const config = require('./utils/config')

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('connected to MongoDB'))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
