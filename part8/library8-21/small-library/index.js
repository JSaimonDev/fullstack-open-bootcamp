const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const moongoose = require('mongoose')
moongoose.set('strict', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const password = process.env.PASSWORD
const MONGO_DB_URI = process.env.MONGO_DB_URI
const url = MONGO_DB_URI.replace('<password>', password)

moongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = `
  type Query {
    dummy: Int,
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
    me: User
  }
  type Book {
    title: String!,
    author: Author!,
    published: Int,
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type UserResponse {
    token: Token!
    favoriteGenre: String!
  }
  type Token {
    value: String!
  }
  type Mutation {
    addBook(
      title: String!,
      name: String!,
      published: Int,
      genres: [String!]
    ) : Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ) : Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): UserResponse
  }

`

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => {
      const books = Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      const books = await Book.find({})
      if(!args.author && args.genre)return books.filter(book => book.genres.includes(args.genre))
      else if (args.author && !args.genre) return books.filter(book => book.author === args.author)
      else if (args.author && args.genre) return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      else return books
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      return books.filter(book => book.author === root.name).length
    },
    name: async (root) => {
      return root.name
    },
    born: async (root) => {
      return root.born
    }
  },
  Book: {
    author: async (root) => {
      const findAuthor = await Author.findById(root.author._id);
      console.log("findAuthor", findAuthor);
      return findAuthor;
    }
  },
  Mutation: {
    addBook: async(root, args, context) => {
      const authors = await Author.find({})
      const { name, ...filteredArgs } = args
      const authorExists = authors.find(author => author.name === name)
      const book = new Book({ ...filteredArgs })

      if(!args.title || !args.name) throw new GraphQLError("Title and name are required", {
        invalidArgs: args,
      })
      if(args.title.length < 2 || args.name.length < 4) throw new GraphQLError("Title must be at least 2 characters long and name must be at least 4 characters long", {
        invalidArgs: args,
      })
      if(!context) throw new GraphQLError("User not authenticated", {
        invalidArgs: args,
      })
      try{
      if(authorExists){
        book.author = authorExists
        await book.save()
      }
      else{
        const author = new Author({ name: name})
        await author.save()
        book.author = author
        await book.save()
      }}
      catch(error){
        throw new GraphQLError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const authors = await Author.find({})
      const authorExists = authors.find(author => author.name === args.name)

      if(!args.name || !args.setBornTo) throw new GraphQLError("Name and setBornTo are required", {
        invalidArgs: args,
      })
      if(args.name.length < 4) throw new GraphQLError("Name must be at least 4 characters long", {
        invalidArgs: args,
      })
      if(!context) throw new GraphQLError("User not authenticated", {
        invalidArgs: args,
      })
      if(authorExists){
        authorExists.born = args.setBornTo
        await authorExists.save()
        return authorExists
      } 
      else return null
    },
    createUser: async (root, args) => {
      const user = new User ( {...args} )
      await user.save()
      .catch(error => {
        throw new GraphQLError(error.message, {
          invalidArgs: args,
        })
      })
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if(!user || args.password !== 'secret') throw new GraphQLError("Wrong credentials", {
        invalidArgs: args,
      })
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { token: { value: jwt.sign(userForToken, process.env.JWT_SECRET) }, favoriteGenre: user.favoriteGenre }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
