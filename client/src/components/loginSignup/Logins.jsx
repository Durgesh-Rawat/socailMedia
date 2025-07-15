import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

 function Logins(){
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   
  const navigate = useNavigate();
   
  const handleLogin = async(e) => {
     e.preventDefault();
     
     const res = await fetch('http://localhost:5000/api/auth/login',{
       method: "POST",
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({email,password})
     });

     const data = await res.json();

     console.log(data);

     if(res.ok){
       localStorage.setItem('token',data.token);
       alert('Login Successfull');
       navigate('/Home');
     } else{
      alert(data.message);
     }
  }


  return (

    <div className=" w-full flex justify-center items-center h-screen ">
      <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button  onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md">
          Login
        </button>
        <p>Dont have an account? <Link to={'/signup'}>Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Logins;
