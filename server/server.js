import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();
import User from "./models/UserSchema.js";
import bcrypt from "bcryptjs";
const secret = "ftedrvtyesbvytnnvtnjhu";
import multer from "multer";
const uploadMiddleware = multer({ dest: "uploads/" });
import fs from "fs";
import path from "path";
import Post from "./models/PostSchema.js";
import jwt from "jsonwebtoken";
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose
  .connect("mongodb+srv://root:root@cluster0.unqyv.mongodb.net/")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  console.log("home page");
  res.send("Hello World");
});
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      username: username,
      email: email,
      password: newPassword,
    });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// app.post("/login", async (req, res) => {
//   const { username, email, password } = req.body;
//   const user = await User.findOne({ username });
//   if (user) {
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (isMatch === true) {
//       const token = jwt.sign({ username, id: user._id }, secret);
//       res.cookie("token", token).json("ok");
//     } else {
//       res.status(400).json({ message: "Invalid password" });
//     }
//   } else {
//     res.status(400).json({ message: "UserName not exist" });
//   }
// });
app.post("/login", async (req, res) => {
  const { username, password } = req.body; // Removed 'email' since it's not used in findOne
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "Username does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate JWT token with an expiration time
  const token = jwt.sign({ username, id: user._id }, secret, {
    expiresIn: "1h",
  });

  // Set cookie with proper options
  res
    .cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access (more secure)
      sameSite: "strict", // Prevents CSRF attacks
      secure: process.env.NODE_ENV === "production",
      id: user._id,
      username, // Secure in production (HTTPS required)
    })
    .json({ message: "Login successful" });
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.json(info);
  });
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
  //res.clearCookie("token").json("ok");
});
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path: tempPath } = req.file;
  const ext = originalname.split(".").pop();
  const newPath = `${tempPath}.${ext}`;

  fs.renameSync(tempPath, newPath, (err) => {
    if (err) return res.status(500).json({ message: "File rename failed" });
  });
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const newPost = new Post({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    await newPost.save();
    res
      .status(200)
      .json({ message: "Post created successfully", post: newPost });
  });
});
app.get("/post", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});
app.listen(3000, () => {
  console.log(`server is running on port ${3000}`);
});
