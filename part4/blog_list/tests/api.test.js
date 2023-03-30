const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { Blog } = require('../models/blog')
const { blogs } = require('./blogList')

beforeAll(async () => {
  await Blog.deleteMany({})
  for (const key in blogs) {
    const blog = new Blog(blogs[key])
    await blog.save()
  }
}, 100000)

const api = supertest(app)

describe('get blogs', () => {
  test('return as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
  test('return correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
  })
  test('have id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

const blogToPost = {
  title: 'Test Title',
  author: 'Myself',
  url: 'http://myself.com',
  likes: 2
}
const blogToPostNoLikes = {
  title: 'Test Title',
  author: 'Myself',
  url: 'http://myself.com'
}
const blogToPostNoTitle = {
  author: 'Myself',
  url: 'http://myself.com',
  likes: 2
}

describe('post blog', () => {
//   test('adds 1 to number of blogs', async () => {
//     await api.post('/api/blogs')
//     const newBlogList = await api.get('/api/blogs')
//     expect(newBlogList.body).toHaveLength(blogs.length + 1)
//   })
  test('save data correctly', async () => {
    const newBlog = await api.post('/api/blogs').send(blogToPost)
    expect(newBlog.body.title).toBe(blogToPost.title)
    expect(newBlog.body.author).toBe(blogToPost.author)
    expect(newBlog.body.url).toBe(blogToPost.url)
    expect(newBlog.body.likes).toBe(blogToPost.likes)
  })
  test('send no likes, likes equal 0', async () => {
    const newBlog = await api.post('/api/blogs').send(blogToPostNoLikes)
    expect(newBlog.body.likes).toBe(0)
  })
  test('get error if no title or url', async () => {
    const newBlog = await api.post('/api/blogs').send(blogToPostNoTitle)
    expect(newBlog.status).toBe(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
