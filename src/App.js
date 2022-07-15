import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import blogServices from './services/blogService'
import Notification from './components/Notification'
import "./App.css"
import BlogNotification from './BlogNotification'

const App = () => {
  const [blogs, setBlogs] = useState([

    {
      title: 'Things I don\'t know as of 2018', author: 'Dan Abramov', url: ''
    },
    {
      title: 'Microservices and the First Law of Distributed Objects ', author: 'Martin Fowler', url: ''

    }
  ])
  // const [newBlogs, setNewBlogs] = useState([
  // ])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    const token = localStorage.getItem('loggedBlogappUser')
    setUser(token)
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user.token)
      )
      blogServices.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setUsername('')
    setPassword('')
  }


  const addBlog = (event) => {
    event.preventDefault()
    setBlogs(blogs.concat({
      title: newTitle,
      author: newAuthor
    }))
    setBlogMessage(`a new blog ${newTitle} has been added`)
    setTimeout(() => {
      setBlogMessage(null)
    }, 5000)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  const loginForm = () => {
    return <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        username
        <input type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  }
  const blogForm = () => {
    return <form onSubmit={addBlog}>

      title: <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
      /><br />
      <h2>blogs</h2>

      author: <input
        onChange={(e) => setNewAuthor(e.target.value)}
        value={newAuthor}
      /><br />
      url: <input
        onChange={(e) => setNewUrl(e.target.value)}
        value={newUrl}
      /><br />
      <button type='submit'>create</button>
    </form>
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {!user
        ? loginForm()
        : <div>
          <BlogNotification message={blogMessage} />
          <p>{user.name} logged in <button onClick={() => {
            localStorage.clear()
            setUser(null)
          }}>logout</button></p>
          <h2>create new</h2>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div >
  )
}

export default App
