import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog } from './models/Blog.js';

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/blogs', async (req, res) => {
  const topic = req.query.topic;
  const blogs = await getAllBlogs();

  if (topic) {
    const filteredBlogs = blogs.filter(blog => blog.topics.includes(topic));
    return res.json(filteredBlogs);
  } else {
    res.json(blogs);
  }
});

app.post('/api/blogs', async (req, res) => {
  const newBlog = await createBlog(req.body);
  res.status(201).json(newBlog);
});

app.get('/api/blogs/:id', async (req, res) => {
  const blog = await getBlogById(parseInt(req.params.id, 10));
  res.json(blog);
});

app.put('/api/blogs/:id', async (req, res) => {
  const updatedBlog = await updateBlog(parseInt(req.params.id, 10), req.body);
  res.json(updatedBlog);
});

app.delete('/api/blogs/:id', (req, res) => {
  deleteBlog(parseInt(req.params.id, 10));
  res.json({ message: 'Blog deleted' });
});

app.get('/api/blogs?topic=:topic', async (req, res) => {
  console.log(req.params.topic);
  const blogs = await getAllBlogs();
  const filteredBlogs = blogs.filter(blog => blog.topics.includes(req.params.topic));
  res.json(filteredBlogs);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
