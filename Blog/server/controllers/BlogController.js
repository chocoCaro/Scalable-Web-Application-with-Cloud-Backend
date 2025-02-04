const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
  } = require('../models/Blog');
  
  // Get all blogs
  exports.getBlogs = (req, res) => {
    const blogs = getAllBlogs();
    res.json(blogs);
  };
  
  // Get a single blog by ID
  exports.getBlog = (req, res) => {
    const blog = getBlogById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  };
  
  // Create a new blog
  exports.createBlog = (req, res) => {
    const newBlog = createBlog(req.body);
    res.status(201).json(newBlog);
  };
  
  // Update a blog
  exports.updateBlog = (req, res) => {
    const updatedBlog = updateBlog(req.params.id, req.body);
    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  };
  
  // Delete a blog
  exports.deleteBlog = (req, res) => {
    deleteBlog(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  };