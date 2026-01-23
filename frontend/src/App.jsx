import { useState } from "react"
import { useAuth } from "./hooks/useAuth.js"

function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, register } = useAuth()

  return (
    <div>
      <div>
        <form onSubmit={register()} >
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <button type="submit">Register</button>
        </form>
      </div>
      <div>
        <form onSubmit={login()} >
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default App
