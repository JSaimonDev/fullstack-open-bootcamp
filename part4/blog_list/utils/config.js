require('dotenv').config()

const PORT = process.env.PORT || 3003

const password = process.env.PASSWORD

const MONGODB_URI = `mongodb+srv://admin:${password}@cluster0.h9qmslj.mongodb.net/?retryWrites=true&w=majority`

module.exports = { MONGODB_URI, PORT }
