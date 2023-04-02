const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const { usersInDb } = require('../utils/user_helper')
const supertest = require('supertest')
const app = require('../app')

beforeAll(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = await new User({ username: 'paco', name: 'tabaco', passwordHash })

  await user.save()
}, 100000)

const api = supertest(app)

describe('when there is initially one user at db', () => {
  test('creation succeds with a fresh username', async () => {
    const usersAtFirst = await usersInDb()

    const newUser = {
      username: 'saco',
      name: 'roto',
      password: 'pass'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtFirst.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})
