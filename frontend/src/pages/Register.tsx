import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await API.post('auth/users/', {
      username,
      password,
      email: `${username}@example.com`, // optional
    });

    console.log("✅ Registration success:", res.data);
    alert("Account created!");
    navigate('/login');
  } catch (err: any) {
    console.error("❌ Registration error:", err.response?.data || err.message);
    alert("Error during registration: " + JSON.stringify(err.response?.data || err.message));
  }
};

  


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          className="w-full p-2 border mb-3"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
