const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let counter = 0
  blogs.length === 0
    ? (counter = 0)
    : blogs.map((blog) => (counter += blog.likes))
  return counter
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) favorite = blog
  })
  return favorite
}

const mostBlogs = (blogs) => {
  const authorCounter = []
  blogs.forEach((blog) => {
    const findAuthor = authorCounter.find(
      (object) => object.author === blog.author
    )
    findAuthor
      ? findAuthor.blogs++
      : authorCounter.push({ author: blog.author, blogs: 1 })
  })
  let mostBlogs = authorCounter[0]
  for (let i = 1; i < authorCounter.length; i++) {
    if (authorCounter[i].blogs > mostBlogs.blogs) mostBlogs = authorCounter[i]
  }
  return mostBlogs
}

const mostLikes = (blogs) => {
  const authorCounter = []
  blogs.forEach((blog) => {
    const findAuthor = authorCounter.find(
      (object) => object.author === blog.author
    )
    findAuthor
      ? (findAuthor.likes += blog.likes)
      : authorCounter.push({ author: blog.author, likes: blog.likes })
  })
  let mostLikes = authorCounter[0]
  for (let i = 1; i < authorCounter.length; i++) {
    if (authorCounter[i].likes > mostLikes.likes) mostLikes = authorCounter[i]
  }
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
