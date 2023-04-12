import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from 'react-icons/fa'
import { register, reset } from "../features/auth/authSlice"
import Spinner from '../components/Spinner';
import AnimatedLetters from "../components/AnimatedLetters/Animate";



const Register = () => {

    const [letterClass, setLetterClass] = useState("text-animate")
    const jobArray = ['B','o','t','t',' e','r','f','l','y',' ','S','t','o','r','a','g','e']
    
    useEffect(() => {
        const timer = setTimeout(() => {
         setLetterClass("text-animate-hover")
       }, 4000)
       return () => clearTimeout(timer);
      },[])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const { name, email, password, password2 } = formData

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

            if(password !== password2){
                toast.error("Passwords do not match")
            }else {
                const userData = {
                    name,
                    email,
                    password
                }
                dispatch(register(userData))
            }
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
            <FaUser /> Create Account
        </h1>
       
    </section>


    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
            <input 
            type="text" 
            className='form-control' 
            id='name' name='name' 
            value={name} 
            placeholder='Enter your name'
            onChange={onChange} 
            />
            </div>

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
            <input 
            type="password" 
            className='form-control' 
            id='password2' name='password2' 
            value={password2} 
            placeholder='Conform password'
            onChange={onChange} 
            />
            </div>
            <div className='form-group'>
                <button type='submit' className='btn btn-block'>Sign Up</button>
            </div>
        </form>
        <div>Already have an Account? <Link to="/login">Sign In</Link></div>
    </section>
  </>
}

export default Register