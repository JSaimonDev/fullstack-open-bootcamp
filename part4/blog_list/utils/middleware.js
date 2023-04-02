function errorHandler (err, req, res, next) {
  if (err.name === 'MongoError' && err.code === 11000) {
    console.log('El nombre de usuario ya está siendo utilizado')
    res.status(400).send('El nombre de usuario ya está siendo utilizado')
  } else {
    next(err)
  }
}

module.exports = { errorHandler }
