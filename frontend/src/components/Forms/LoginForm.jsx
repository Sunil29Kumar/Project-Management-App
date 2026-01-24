import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { showToast } from '../../utils/toast';

function LoginForm() {
  const { login, isAuth } = useAuth()
  const [email, setEmail] = React.useState('sunil.kksdk@gmail.com');
  const [password, setPassword] = React.useState('Sunil@12345');

  console.log("isAuth", isAuth);


  const handleLogin = (e) => {
    e.preventDefault();
    showToast.promise(
      login(email, password),
      {
        loading: () => 'Logging in...',
        success: (data) => data.message || 'Login Success!',
        error: (err) => err.response?.data?.message || 'Login Failed',
      }
    );
  }
  return (
    <div>
      <form onSubmit={handleLogin} >
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm