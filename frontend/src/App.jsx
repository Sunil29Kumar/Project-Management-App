import { useState } from "react"
import { useAuth } from "./hooks/useAuth.js"

function App() {

  const [name, setName] = useState("sunil")
  const [email, setEmail] = useState("sunil@example.com")
  const [password, setPassword] = useState("Sunlil@123")

  const { login, register, logout } = useAuth()

  const handlelogin = async (e) => {
    e.preventDefault()
    const data = await login(email, password)
    console.log(data)
  }
  const handleregister = async (e) => {
    e.preventDefault()
    const data = await register(name, email, password)
    console.log(data)
  }

  return (
    <div className=" bg-amber-300 " >
      <div className=" h-20 ">
        <form onSubmit={handleregister} >
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <button type="submit">Register</button>
        </form>
      </div>
      <div className=" h-30 bg-blue-400 ">
        <form onSubmit={handlelogin} >
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <button type="submit">Login</button>
        </form>
      </div>


      <button onClick={async () => await logout()}>logout</button>
    </div>
  )
}

export default App
