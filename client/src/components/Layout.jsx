import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
const Layout = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((info) => {
        setUserInfo(info);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  function logout() {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setUserInfo(null); // Update state after logout
      })
      .catch((error) => console.error("Logout error:", error));
  }
  const username = userInfo?.username;

  return (
    <div className="">
      <main>
        <div>
          <div className="logo">Mr.Blog</div>
          <div>
            <nav>
              {username ? (
                <>
                  <Link to="/create">Create Post</Link>
                  <a
                    onClick={logout}
                    style={{
                      background: "none",
                      border: "none",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </main>
      <Outlet />
    </div>
  );
};

export default Layout;
