import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
query {
    allBooks {
        title
        author{
            name
            born
        }
        published
        genres
    }
}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        published: $published,
        name: $author,
        genres: $genres
    ) {
        title
        author{
            name
        }
        published
        genres
    }
}
`
const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo  
    ) {
        name
        born
    }
}
`

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(
        username: $username,
        password: $password
    ) {
        token{
            value
        }
        favoriteGenre
    }
}
`

export { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR, LOGIN }