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
    < div style={blogStyle} >
      <div style={show}>

        <p>{blog.title}  <button onClick={() => setShowDetails(true)}>view</button></p>
      </div >
      <div style={hide}>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>Likes {like} <button onClick={() => setLike(like + 1)}>like</button></p>
        <p>{blog.author} <button onClick={() => setShowDetails(false)}>hide</button></p>
      </div>
      <button>remove</button>
    </div>

  )
}




export default Blog