const jwt = require('jsonwebtoken')

function errorHandler (err, req, res, next) {
  if (err.name === 'MongoError' && err.code === 11000) {
    console.log('El nombre de usuario ya está siendo utilizado')
    res.status(400).send('El nombre de usuario ya está siendo utilizado')
  } else {
    next(err)
  }
}

function tokenExtractor (req, res, next) {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else return null
  next()
}

function userExtractor (req, res, next) {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    req.user = decodedToken.id
  }
  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }
