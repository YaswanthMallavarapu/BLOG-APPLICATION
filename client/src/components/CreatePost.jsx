import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  async function createPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file);
    // console.log(file);
    const res = await fetch("http://localhost:3000/post", {
      method: "POST",
      // headers: {},
      credentials:'include',
      body: data,
    });
    if (res.status === 200) {
      alert("Post created successfully");
      setRedirect(true);
    } else {
      alert("Failed to create post");
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col w-screen h-[100vh] justify-center items-center bg-gray-100">
      <form
        className="flex flex-col bg-white shadow-lg rounded-xl p-6 w-full max-w-lg space-y-4 items-center overflow-hidden gap-3 h-auto"
        onSubmit={createPost}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create a Post
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[90%]"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <input
          type="text"
          placeholder="Summary"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[90%]"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />

        <input
          type="file"
          className="border border-gray-300 rounded-md p-2 cursor-pointer file:bg-blue-500 file:text-white file:px-4 file:py-3 file:border-none file:rounded-md hover:file:bg-blue-600 w-[90%] min-h-[50px] text-center"
          // value={file}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Fixed ReactQuill spacing and height */}
        <div className="w-[90%]">
          <ReactQuill
            className="h-[200px] rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            theme="snow"
            value={content}
            onChange={setContent} // ReactQuill directly provides value
          />
        </div>

        <button
          className="bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300 w-[90%]"
          type="submit"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
