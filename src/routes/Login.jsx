import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
    const {login} = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      try {
        // Development HACK - lets let anything through :)
        if (password == '') {
            throw new Error('Invalid value');
        }
        login({username: username})
        //await authenticate(username, password); // Assuming you have the authenticate function
        navigate('/profile');
      } catch {
        setError('Invalid username or password');
      }
    };

    return ( 
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error}
            <input type="submit" value="Login" />
            </form>
        </div>
     );
}

export default Login;