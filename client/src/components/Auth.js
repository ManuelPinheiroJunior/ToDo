import { useState } from "react";
import { setCookie, useCookies } from 'react-cookie';


const Auth = () => {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if(!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);

      window.location.reload();
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
        <h2>{isLogin ? 'Login' : 'Please Sign Up!'}</h2>
        <label className="login-label">E-mail</label>
        <input className="Basic-Input" type="text" placeholder="email" onChange={ (e) => setEmail(e.target.value)} />
        <label className="login-babel">Password</label>
        <input className="Basic-Input" type="password" placeholder="password" onChange={ (e) => setPassword(e.target.value)} />
        {!isLogin && <input className="Basic-Input" type="password" placeholder="confirm password" onChange={ (e) => setConfirmPassword(e.target.value)} />}
        <input type="submit" className="createLogin" value="Sign in" onClick={(e) => handleSubmit(e, isLogin ? 'Login' : 'Signup')} />
        {error && <p className="error">{error}</p>}
      </form>
      <div className="auth-options">
        <button className="custom-btn btn" onClick={ () => viewLogin(false)} style={{backgroundColor: !isLogin ? 'rgb(255,255,255)' : 'rgb(188, 188, 188)'}}>
         <span>SIGN UP</span> 
        </button>
        <button className="custom-btn btn" onClick={ () => viewLogin(true)} style={{backgroundColor: !isLogin ? 'rgb(255,255,255)' : 'rgb(188, 188, 188)'}}>
          <span>LOGIN</span>
        </button>
    </div>
   </div>
   </div>
   </>
  );
}

export default Auth;
