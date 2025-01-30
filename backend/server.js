// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load các biến môi trường từ file .env

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Cho phép giao tiếp giữa frontend và backend
app.use(express.json()); // Chuyển đổi body của request thành JSON

// Dữ liệu giả lập: danh sách blog
let blogs = [
  { id: 1, title: "Blog 1", content: "Content of blog 1" },
  { id: 2, title: "Blog 2", content: "Content of blog 2" },
];

// API Lấy danh sách blog
app.get('/blogs', (req, res) => {
  res.json(blogs);
});

// API Thêm blog mới
app.post('/blogs', (req, res) => {
  const newBlog = req.body;
  newBlog.id = blogs.length + 1; // Tạo id cho blog mới
  blogs.push(newBlog); // Thêm vào danh sách
  console.log('New Blog:', newBlog);
  res.status(201).json(newBlog);
});

// API Chỉnh sửa blog
app.put('/blogs/:id', (req, res) => {
  const { id } = req.params;
  const updatedBlog = req.body;

  // Tìm blog theo id
  let blogIndex = blogs.findIndex(blog => blog.id === parseInt(id));
  if (blogIndex === -1) {
    return res.status(404).send('Blog not found');
  }

  // Cập nhật blog
  blogs[blogIndex] = { id: parseInt(id), ...updatedBlog };
  console.log(`Updated Blog ID ${id}:`, updatedBlog);
  res.json(blogs[blogIndex]);
});

// API Xóa blog
app.delete('/blogs/:id', (req, res) => {
  const { id } = req.params;

  // Tìm blog theo id
  let blogIndex = blogs.findIndex(blog => blog.id === parseInt(id));
  if (blogIndex === -1) {
    return res.status(404).send('Blog not found');
  }

  // Xóa blog
  blogs.splice(blogIndex, 1);
  console.log(`Deleted Blog ID ${id}`);
  res.status(204).send();
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
