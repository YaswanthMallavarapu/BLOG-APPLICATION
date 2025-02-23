import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function register(e) {
    e.preventDefault();
    // Your logic to register the user goes here.
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (res.status === 200) {
        alert("Registartion successful");
      } else {
        alert("Registration failed");
      }
    } catch (e) {}
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="w-96 p-6 bg-white rounded-2xl shadow-xl flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Register
        </h2>
        <p className="text-gray-500 text-center">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </Link>
        </p>
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-[80%]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-[80%]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-[80%]"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={register}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
