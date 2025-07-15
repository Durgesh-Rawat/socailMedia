import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handlesignup = async(e) => {
      e.preventDefault();

      const res = await fetch('http://localhost:5000/api/auth/signup',{
         method: "POST",
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({email,password})
      });

      const data = await res.json();
      
      if(res.ok){
        alert('Signup successful! You can now log in.');
        navigate('/login');
      } else{
        alert(data.error);
      }
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form  className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
        <button
          onClick={handlesignup}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md"
        >
          Sign Up
        </button>
        <p>Already have an account? <Link to={'/login'}>Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
