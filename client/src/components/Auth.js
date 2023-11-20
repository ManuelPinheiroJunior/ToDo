import { useState } from "react";
import { useCookies } from 'react-cookie';

const Auth = () => {
  const [cookies, setCookie] = useCookies([]); // Removi o 'removeCookie' pois não estava sendo utilizado
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);

      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className="auth-container-left">
        <img src="Anime.svg" alt="logo" />
      </div>
      <div className="auth-container-right">
        <div className="auth-container-right-card">
          <form >
            <h2>{isLogin ? 'Login' : 'Please Sign Up'}</h2>
            <label className="login-label">E-mail</label>
            <input className="Basic-Input" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className="login-babel">Password</label>
            <input className="Basic-Input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {!isLogin && <input className="Basic-Input" type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
            {error && <p className="error">{error}</p>}
            <input type="submit" className="createLogin" value="Sign in"  onClick={(e) => handleSubmit(e, isLogin ? 'Login' : 'Signup')}/>
            <div className="auth-options">
            <label className="login-label">Don't have an account?</label>
            <a href="#" onClick={() => viewLogin(!isLogin)}>{isLogin ? 'Sign up Now' : 'Back to login'}</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Auth;