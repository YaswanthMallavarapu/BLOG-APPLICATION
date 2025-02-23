import React from "react";
import "./Post.css";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
const Post = ({ title, summary, cover, content, createdAt, author }) => {
  console.log(cover);
  return (
    <div className="post">
      <div className="post-img max-h-[300px]">
        <img src={"http://localhost:3000/" + cover} alt="" />
      </div>
      <div className="post-text">
        <Link to={""}>
          {" "}
          <h3 className="text-2xl font-bold text-blue-700">{title}</h3>
        </Link>
        <span>
          <p className="text-lg">
            {author.username} <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
        </span>

        {content}
      </div>
    </div>
  );
};

export default Post;
