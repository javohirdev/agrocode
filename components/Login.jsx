import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import '../styles/Auth.css';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '../config'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setTimeActive } = useAuthValue()
    const navigate = useNavigate()

    const login = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (!auth.currentUser.emailVerified) {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setTimeActive(true)
                            navigate('/verify-email')
                        })
                        .catch(err => alert(err.message))
                } else {
                    navigate('/')
                }
            })
            .catch(err => setError(err.message))
    }

    return (
        <div className="login__box">
            <Link to="/"><img src={logo} alt="agrocode" /></Link>
            <form onSubmit={login} className="main">
                <p>Login</p>
                {error && <div className='auth__error'>{error}</div>}
                <div className='input__area'>
                    <input type='email'
                       value={email}
                        required
                        placeholder="Enter your email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='input__area'>
                    <input type='password'
                        value={password}
                        required
                        placeholder='Enter your password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className='auth__button' type='submit'>
                    Login
                </button>
            </form>
            <Link className='direct__link' to="/register">
                Register
            </Link>
        </div>
    );
};

export default Login;