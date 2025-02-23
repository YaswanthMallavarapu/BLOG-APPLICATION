import React, { useState } from "react";
import Post from "../components/Post";
import { useEffect } from "react";
const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/post")
      .then((response) => {
        // console.log(response);
        response.json().then((posts) => {
          setPosts(posts);
          console.log(posts);
        });
      })
      .then((response) => {})
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="posts" style={{ width: "80vw" }}>
        {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      </div>
    </div>
  );
};

export default IndexPage;
