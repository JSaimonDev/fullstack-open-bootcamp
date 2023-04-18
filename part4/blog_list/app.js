const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const testRouter = require('./controllers/test')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const { loginRouter } = require('./controllers/login')

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('connected to MongoDB'))
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', middleware.userExtractor, usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/test', testRouter)

app.use(middleware.errorHandler)

module.exports = app
