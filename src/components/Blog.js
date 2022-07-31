import { useState } from "react"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [like, setLike] = useState(0)
  const [showDetails, setShowDetails] = useState(false)


  const show = { display: showDetails ? 'none' : '' }
  const hide = { display: showDetails ? '' : 'none' }

  return (
    <div style={show}>

      < div style={blogStyle} >
        <p>{blog.title}  <button onClick={() => setShowDetails(true)}>view</button></p>
        <p>{blog.url}</p>
        <p>Likes {like} <button onClick={() => setLike(like++)}>like</button></p>
        <p>{blog.author}</p>
      </div >
    </div>

  )
}




export default Blog