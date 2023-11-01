const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length) {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  } else return 0
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let maxLikes = -1
  let favoriteBlog = null

  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      favoriteBlog = blog
    }
  })

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCount = _.countBy(blogs, 'author')
  const maxBlogsAuthor = _.maxBy(_.keys(authorCount), (author) => authorCount[author])

  return {
    author: maxBlogsAuthor,
    blogs: authorCount[maxBlogsAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = _.map(likesByAuthor, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes'),
  }))
  const maxLikesAuthor = _.maxBy(authorLikes, 'likes')

  return {
    author: maxLikesAuthor.author,
    likes: maxLikesAuthor.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

