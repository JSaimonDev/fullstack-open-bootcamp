import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../Queries"
import { useContext } from "react"
import FavoriteContext from "../context/favoriteContext"

const LoginForm = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [ favorite, setFavorite ] = useContext(FavoriteContext)
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
        console.log(error.graphQLErrors[0].message)
        },
    })
    
    useEffect(() => {
        if (result.data) {
        const token = result.data.login.token.value
        props.setToken(token)
        localStorage.setItem("library-user-token", token)
        setFavorite(result.data.login.favoriteGenre)
        }
    }, [result.data]) // eslint-disable-line
    
    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    if(!props.show) {
        return null
    }
    
    return (
        <div>
        <form onSubmit={submit}>
            <div>
            username
            <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password
            <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
        </form>
        </div>
    )
    }

export default LoginForm