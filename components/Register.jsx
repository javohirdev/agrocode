import { useState } from 'react'
import logo from '../assets/logo.png'
import { auth } from '../config'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthValue } from '../AuthContext'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [addSelect, setAddSelect] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { setTimeActive } = useAuthValue()

    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                isValid = false
                setError('Passwords does not match')
            }
        }
        return isValid
    }

    const register = e => {
        e.preventDefault()
        setError('')
        if (validatePassword()) {
            // Create a new user with email and password using firebase
            createUserWithEmailAndPassword(auth, email, password, addSelect)
                .then(() => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setTimeActive(true)
                            navigate('/verify-email')
                        }).catch((err) => alert(err.message))
                })
                .catch(err => setError(err.message))
        }
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setAddSelect('')
    }

    return (
        <div className="login__box">
            <Link to="/"><img src={logo} alt="agrocode" /></Link>
            <form onSubmit={register} className="main">
                <p>Register</p>
                {error && <div className='auth__error'>{error}</div>}
                <div className='input__area'>
                    <input type='email'
                        value={email}
                        placeholder="Enter your email"
                        required
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
                <div className='input__area'>
                    <input type='password'
                        value={confirmPassword}
                        required
                        placeholder='Confirm password'
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className='input__area'>
                    <select
                        value={addSelect}
                        onChange={e => setAddSelect(e.target.value)}
                    >
                        <option value="Farmer">Farmer</option>
                        <option value="Customer">Customer</option>
                        <option value="Delievery">Delievery</option>
                    </select>
                </div>
                <button className='auth__button' type='submit'>Create account</button>
            </form>
            <Link to="/login" className='direct__link'>Login</Link>
        </div>
    );
};

export default Register;