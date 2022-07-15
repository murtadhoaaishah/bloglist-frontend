import React from 'react'

const LoginForm = (props) => {
    return (
        // <form onSubmit={handleLogin}>
        <form onSubmit={props.handleSubmit}>
            <h2>Log in to application</h2>
            <div>
                username
                <input type="text"
                    value={props.username}
                    name="username"
                    // onChange={({ target }) => setUsername(target.value)}
                    onChange={props.handleUsernameChange}
                />
            </div>

            <div>
                password
                <input type="password"
                    value={props.password}
                    name="password"
                    // onChange={({ target }) => setPassword(target.value)}
                    onChange={props.handlePasswordChange}

                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm
