import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
    title
    author{
        name
    }
    published
    genres
}
`

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
query allBooks($genre: String) {
    allBooks(genre: $genre){
        ...BookDetails
    }
}
${BOOK_DETAILS}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        published: $published,
        name: $author,
        genres: $genres
    ) {
        ...BookDetails
    }
}
${BOOK_DETAILS}
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

const BOOK_ADDED = gql`
subscription {
    bookAdded {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`

export { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR, LOGIN, BOOK_ADDED }