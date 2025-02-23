import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { UserContext, UserContextProvider } from "./UserContext";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [canredirect, setcanredirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        res.json().then((userInfo) => {
          setUserInfo(userInfo);
          setcanredirect(true);
        });
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
    }
  }
  if (canredirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-[10px]">
      <form
        className="w-96 p-10 bg-white rounded-2xl shadow-xl flex flex-col gap-4"
        onSubmit={login}
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Login
        </h2>
        <p className="text-gray-500 text-center">
          Don't have an account?
          <Link to="/register" className="text-blue-500 hover:underline ml-1">
            Create One
          </Link>
        </p>
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 w-[80%]  flex items-center focus:ring-blue-400 mx-[10px]"
            value={username}
            onChange={(ev) => setusername(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg w-[80%] focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(ev) => setpassword(ev.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 my-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
