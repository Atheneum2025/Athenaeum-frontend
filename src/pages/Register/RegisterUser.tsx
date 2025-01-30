
import { useState } from 'react'
import Button from '../../components/Button/Button'
import axios from 'axios';

export default function RegisterUser() {

  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/signup', { username, password, role, email });
      console.log(email)
      console.log("signup successful", response.data);
    }
    catch (err) {
      console.error("signup failed:", err);
    }
  }
  return (
    <>
      <h1>REGISTER</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <input
          type="text"
          value={username}
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="role">Role</label>
        <input
          type="text"
          value={role}
          id="role"
          onChange={(e) => setRole(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="text"
          value={confirmPassword}
          id="confirm-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn' type='submit'>Register</button>

        <p>Already have an account ? <a href="/login">LOG IN</a></p>
        <p>OR</p>
        <p>Use As Guest</p>
      </form>
    </>
  )
}
