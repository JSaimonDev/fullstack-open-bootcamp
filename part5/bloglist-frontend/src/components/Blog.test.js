import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Myself',
  url: 'pacotabaco.com',
  likes: 3
}


test ('Blog info appears after button gets clicked', () => {

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleableMockHandlder={mockHandler} />
  )

  const button = screen.getByText('Show blog')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('After clicking show blog button, title and author are visible, but nor url and likes', () => {

  const mockHandler = jest.fn()

  const view = render(
    <Blog blog={blog} toggleableMockHandlder={mockHandler} />
  )

  const button = screen.getByText('Show blog')
  fireEvent.click(button)

  expect (view.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect (view.container).toHaveTextContent(
    'Myself'
  )
  expect(screen.queryByText('pacotabaco.com')).not.toBeVisible()
  expect(screen.queryByText('3')).not.toBeVisible()

  })



test ('Url and likes get visible after clicking show details button', () => {

  const mockHandler = jest.fn()
  
  render(
    <Blog blog={blog} toggleableMockHandlder={mockHandler} />
  )

  const buttonShowBlog = screen.getByText('Show blog')
  fireEvent.click(buttonShowBlog)

  const buttonShowDetails = screen.getByText('Show details')
  fireEvent.click(buttonShowDetails)


  expect(screen.getByText('pacotabaco.com')).toBeInTheDocument()
  expect(screen.getByText('3')).toBeInTheDocument()

})

test ('Like button gets clicked twice', () => {
  
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleableMockHandlder={mockHandler} likeMockHandler = {mockHandler}/>
  )

  const buttonShowBlog = screen.getByText('Show blog')
  fireEvent.click(buttonShowBlog)

  const buttonShowDetails = screen.getByText('Show details')
  fireEvent.click(buttonShowDetails)

  const buttonLike = screen.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(4)
})