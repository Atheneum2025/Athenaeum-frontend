
import { useState } from 'react'
import Button from '../../components/Button/Button'

export default function RegisterUser() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
   <>
    <h1>REGISTER</h1>
    <form action="">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="college">College</label>
        <input type="text" id="college"/>
        <label htmlFor="email">Name</label>
        <input type="email" id="email" />
        <label htmlFor="password">College</label>
        <input type="password" id="password"/>

        <Button name="REGISTER"></Button>

        <p>Already have an account ? LOG IN</p>
        <p>OR</p>
        <p>Use As Guest</p>
    </form>
   </>
  )
}
