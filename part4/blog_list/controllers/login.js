const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const { User } = require('../models/user')

loginRouter.post('/', async (req, res) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const tokenUser = await User.findById(decodedToken.id)
    tokenUser
      ? res.status(200).send({ token: req.token, username: tokenUser.username, name: tokenUser.name })
      : res.status(401).json({ error: 'token missing or invalid' })
  } else {
    const body = req.body

    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
    const userForToken = {
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    res
      .status(200)
      .send({ token, username: user.username, name: user.name })
  }
})

module.exports = { loginRouter }
