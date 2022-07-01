import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import blogServices from './services/blogService'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogs, setNewBlogs] = useState('new blog ...')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      // window.localStorage.setItem(
      //   'loggedBlogappUser', JSON.stringify(user)
      // )
      blogServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const addBlog = (event) => {
    event.preventDefault()
    setNewBlogs(blogs.concat(newBlogs))
    setNewBlogs('')
  }


  const loginForm = () => {
    <form onSubmit={handleLogin}>
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
    <form onSubmit={addBlog}>

      <input
        onChange={(e) => setNewBlogs(e.target.value)}
        value={newBlogs}
      />
      <button type='submit'>save</button>
    </form>
  }
  // if (user === null) {
  //   return (
  //     <div>
  //       <form>

  //       </form>
  //     </div>
  //   )
  // }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {user === null
        ? loginForm()
        : <div>
          <p>{user.name} logged in</p>
          {blogForm()}
        </div>}
    </div >
  )
}

export default App
