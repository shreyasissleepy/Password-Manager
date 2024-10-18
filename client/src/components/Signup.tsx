import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Signup = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = () => {
      axios.post('http://localhost:3000/signup',{name:name,email:email,password:password})
      .then(res => navigate('/dashboard',{state:name}))
    }
    
  return (
    <div className='Signup'>
        <h1>Signup</h1>
        <input type="text" placeholder='Enter your Name' onChange={(e) => setName(e.target.value)}/><br />
        <input type="text" placeholder='Enter your Email ID' onChange={(e) => setEmail(e.target.value)}/><br />
        <input type="text" placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)}/><br />
        <button onClick={handleSubmit}>Signup</button>
    </div>
  )
}

export default Signup