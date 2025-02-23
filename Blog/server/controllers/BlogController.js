import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../models/Blog.js';

// Get all blogs
export function getBlogs(req, res) {
  const blogs = getAllBlogs();
  res.json(blogs);
}

// Get a single blog by ID
export function getBlog(req, res) {
  const blog = getBlogById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
}

// Create a new blog
const _createBlog = (req, res) => {
  const newBlog = createBlog(req.body);
  res.status(201).json(newBlog);
};
export { _createBlog as createBlog };

// Update a blog
const _updateBlog = (req, res) => {
  const updatedBlog = updateBlog(req.params.id, req.body);
  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};
export { _updateBlog as updateBlog };

// Delete a blog
const _deleteBlog = (req, res) => {
  deleteBlog(req.params.id);
  res.json({ message: 'Blog deleted successfully' });
};
export { _deleteBlog as deleteBlog };