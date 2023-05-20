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
  type Subscription {
    bookAdded: Book!
    }
`

module.exports = typeDefs
