
const BlogNotification = ({ message }) => {
    if (message === null)
        return null
    return (
        <div className='notification'>
            <h1>{message}</h1>
        </div>
    )
}

export default BlogNotification
