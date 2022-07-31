import { useState } from 'react'
import BlogNotification from '../BlogNotification'





const BlogForm = ({ blogs, setBlogs }) => {



    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [blogMessage, setBlogMessage] = useState(null)
    const [showBlogForm, setShowBlogForm] = useState(false)


    const addBlog = (event) => {
        event.preventDefault()
        if (!newTitle.trim()) return
        if (!newAuthor.trim()) return
        if (!newUrl.trim()) return
        setBlogs(blogs.concat({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }))
        setBlogMessage(`a new blog ${newTitle} has been added`)
        setTimeout(() => {
            setBlogMessage(null)
        }, 5000)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    const showVisibility = { display: showBlogForm ? 'none' : '' }
    const hideVisibility = { display: showBlogForm ? '' : 'none' }


    return (
        <div>

            <div style={showVisibility}>
                <button onClick={() => setShowBlogForm(true)}>create</button>
            </div>
            <div style={hideVisibility}>
                <form onSubmit={addBlog}>

                    <h2>blogs</h2>
                    title: <input
                        onChange={(e) => setNewTitle(e.target.value)}
                        value={newTitle}
                    /><br />

                    author: <input
                        onChange={(e) => setNewAuthor(e.target.value)}
                        value={newAuthor}
                    /><br />
                    url: <input
                        onChange={(e) => setNewUrl(e.target.value)}
                        value={newUrl}
                    /><br />
                    <button onClick={() => setShowBlogForm(true)}>create</button> <br />
                    <button type='submit' onClick={() => setShowBlogForm(false)}>cancel </button>
                </form>
            </div>
            <BlogNotification message={blogMessage} />

        </div>
    )
}

export default BlogForm
