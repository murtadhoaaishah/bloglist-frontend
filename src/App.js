import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import blogServices from './services/blogService'
import Notification from './components/Notification'
import "./App.css"
import BlogNotification from './BlogNotification'
// import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([

    {
      title: 'Things I don\'t know as of 2018', author: 'Dan Abramov', url: ''
    },
    {
      title: 'Microservices and the First Law of Distributed Objects ', author: 'Martin Fowler', url: ''

    }
  ])

  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



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





  return (
    <div>
      <Notification message={errorMessage} />


      {!user
        ? loginForm()
        : <div>
          <p>{user.name} logged in <button onClick={() => {
            localStorage.clear()
            setUser(null)
          }}>logout</button></p>
          <h2>create new</h2>
          <BlogForm setBlogs={setBlogs} blogs={blogs} />
          {blogs.map((blog, index) =>
            <Blog key={`blog_${index}`} blog={blog} />
          )}
        </div>}
    </div >
  )
}

export default App
