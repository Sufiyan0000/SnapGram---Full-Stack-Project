import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";

const Form = ({route,method}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const name = method === 'login' ? 'Login' : 'Register'

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    try{
        const res = await api.post(route,{username,password});

        if (method === 'login'){
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
            navigate('/')
        }else{
            navigate('/login')
        }
    }catch(e){
        alert(e)
    }finally{
        setLoading(false)
    }
  }

  return <form onSubmit={handleSubmit} className="w-100 h-auto flex flex-col  mx-auto mt-20 p-5 gap-5 shadow-2xl border-2 border-neutral-200">

    <h1 className="text-[30px] text-center mb-4 tracking-widest font-semibold">{name}</h1>

    <input 
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Username"
    className="border-2 border-neutral-200 p-2"
    />
    <input 
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    className="border-2 border-neutral-200 p-2"
    />
    <button type="submit"
    className="bg-blue-600 text-white py-2 text-lg tracking-wider hover:cursor-pointer"
    >{name}</button>
  </form>;
};

export default Form;
