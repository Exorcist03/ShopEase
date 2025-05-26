import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state, setstate] = useState("Sign up");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })

  const changehandler = (e) => { // for getting the info from the form
    setFormData({...formData, [e.target.name]: e.target.value}); // name is the property of the input field
  }

  const togglestate = () => {
    if(state === "Login") setstate("Sign up");
    else setstate("Login");
  }

  const login = async () => {
    // alert("login")
    // console.log(formData.username)
    console.log("Login function executed: ", formData);
    let responseData;
    await fetch('https://shopease-backend-dqya.onrender.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    if(responseData.success) { // it means username and password is correct and token is generated
      // add token to local storage
      localStorage.setItem('auth-token', responseData.token);
      // now once token is placed it will login 
      // dedice where to take the user 
      window.location.replace("/"); // path of the dest just after our authintication is done
    } else {
      alert(responseData.errors);
    }

  }
  const signup = async () => {
    // alert("signup")
    console.log("Signup function executed", formData.password)
    let responseData;
    await fetch('https://shopease-backend-dqya.onrender.com/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if(responseData.success) { // it means username and password is correct and token is generated
      // add token to local storage
      localStorage.setItem('auth-token', responseData.token);
      // now once token is placed it will login 
      // dedice where to take the user 
      window.location.replace("/"); // path of the dest just after our authintication is done
    } else {
      alert(responseData.errors);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state === "Login" ? <></> :<input name='username' value={formData.username} onChange={changehandler} type="text" placeholder='Your Name' /> } 
          <input name='email' value={formData.email} onChange={changehandler} type="email" placeholder='Email Address' />
          <input name='password' onChange={changehandler} value={formData.password} type="password" placeholder='Password' />
        </div>
        <button onClick={state === "Login"? login : signup}>Continue</button>
        {state === "Login" ?<p className="loginsignup-login">
          Create an account? <span onClick={togglestate}>Click here</span>
        </p> : <p className="loginsignup-login">
          Already have an account? <span onClick={togglestate}>Login here</span>
        </p>}
        
        
        <div className="loginsignup-agree">
          <input type="checkbox" name=''id='' />
          <p>By continuing, I agree to Priyank's policy</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup
