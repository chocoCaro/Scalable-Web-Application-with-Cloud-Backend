import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog } from './models/Blog.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/api/blogs', async (req, res) => {
  const blogs = await getAllBlogs();
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  const newBlog = await createBlog(req.body);
  res.status(201).json(newBlog);
});

app.get('/api/blogs/:id', async (req, res) => {
  console.log(req.params);
  const blog = await getBlogById(req.params.id);
  res.json(blog);
});

app.put('/api/blogs/:id', async (req, res) => {
  const updatedBlog = updateBlog(req.params.id, req.body);
  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  deleteBlog(req.params.id);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
