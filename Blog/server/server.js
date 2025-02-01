import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

let blogs = [];

// Lấy tất cả bài viết, sắp xếp theo ngày tạo mới nhất
app.get('/api/blogs', (req, res) => {
  res.json({
    success: true,
    data: blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  });
});

// Tạo bài viết mới
app.post('/api/blogs', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title và Content là bắt buộc' });
  }

  const newBlog = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  blogs.unshift(newBlog);
  res.status(201).json({ success: true, data: newBlog });
});

// Cập nhật bài viết
app.put('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const blogIndex = blogs.findIndex(blog => blog.id === id);

  if (blogIndex === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  }

  blogs[blogIndex] = { ...blogs[blogIndex], title, content };
  res.json({ success: true, data: blogs[blogIndex] });
});

// Xóa bài viết
app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const blogExists = blogs.some(blog => blog.id === id);

  if (!blogExists) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  }

  blogs = blogs.filter(blog => blog.id !== id);
  res.json({ success: true, message: 'Bài viết đã được xóa' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
