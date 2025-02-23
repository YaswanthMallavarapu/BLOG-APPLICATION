import "./App.css";
import Post from "./components/Post";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import { useEffect, useState } from "react";
import Createpost from "./components/Createpost";
import { UserContextProvider } from "./components/UserContext";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Createpost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
