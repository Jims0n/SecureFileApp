import {React, useState,useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login, reset } from "../features/auth/authSlice"
import Spinner from '../components/Spinner';
import AnimatedLetters from "../components/AnimatedLetters/Animate";



const Login = () => {

    const [letterClass, setLetterClass] = useState("text-animate")
    const jobArray = ['B','o','t','t',' e','r','f','l','y',' ','S','t','o','r','a','g','e']
    
    useEffect(() => {
        const timer = setTimeout(() => {
         setLetterClass("text-animate-hover")
       }, 4000)
       return () => clearTimeout(timer);
      },[])


    const [formData, setFormData] = useState({
        email: "",
        password: "",
       
    })

    const { email, password, } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isSuccess, isError, message } = useSelector( (state) => state.auth )

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
            e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

  return <>
  <section>
  <h1 className='site_name'>
  <AnimatedLetters 
        letterClass={letterClass}
        strArray={jobArray}
        idx={6}
      />
  </h1>
  </section>
  
    <section className='heading'>
        <h1>
            <FaSignInAlt /> Sign In
        </h1>
       
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
           
            <div className='form-group'>
            <input 
            type="email" 
            className='form-control' 
            id='email' name='email' 
            value={email} 
            placeholder='Enter your email'
            onChange={onChange} 
            />
            </div>

            <div className='form-group'>
            <input 
            type="password" 
            className='form-control' 
            id='password' name='password' 
            value={password} 
            placeholder='Enter password'
            onChange={onChange} 
            />
            </div>

            <div className='form-group'>
                <button type='submit' className='btn btn-block'>Sign In</button>
            </div>
        </form>
        <div>Don't have an Account? <Link to="/register">Sign Up</Link></div>
    </section>
  </>
}

export default Login