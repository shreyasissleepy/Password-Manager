import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [errbox,setErrbox] = useState('')

    const navigate = useNavigate()

    const handleSubmit = () => {
      axios.post('http://localhost:3000/login',{name:name,password:password})
      .then(res => {
        if (res.data == 'Access granted'){
          navigate('/dashboard',{state:name})
        }else{
          setErrbox('Incorrect Credentials,Try again')
        }
      })
    }
    
  return (
    <div className='Login'>
        <h1>Login</h1>
        <input type="text" placeholder='Enter your Email ID' onChange={(e) => setName(e.target.value)}/><br />
        <input type="text" placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)}/><br /><br />
        <p className="errbox">{errbox}</p>
        <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login