import React from 'react'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <h2>Log in to application</h2>
            <div>
                username
                <input type="text"
                    value={props.username}
                    name="username"
                    onChange={props.handleUsernameChange}
                />
            </div>

            <div>
                password
                <input type="password"
                    value={props.password}
                    name="password"
                    onChange={props.handlePasswordChange}

                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm
