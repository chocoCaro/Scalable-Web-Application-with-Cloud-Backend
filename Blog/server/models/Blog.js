const { v4: uuidv4 } = require('uuid');

// Dummy data
let blogs = [
  {
    id: uuidv4(),
    title: 'Introduction to React',
    content: 'React is a JavaScript library for building user interfaces.',
    topics: ['technology', 'programming'],
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Healthy Lifestyle Tips',
    content: 'Here are some tips for maintaining a healthy lifestyle.',
    topics: ['lifestyle', 'health'],
    createdAt: new Date().toISOString(),
  },
];

// Get all blogs
const getAllBlogs = () => blogs;

// Get blog by ID
const getBlogById = (id) => blogs.find((blog) => blog.id === id);

// Create a new blog
const createBlog = (blog) => {
  const newBlog = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...blog,
  };
  blogs = [newBlog, ...blogs];
  return newBlog;
};

// Update a blog
const updateBlog = (id, updatedBlog) => {
  blogs = blogs.map((blog) =>
    blog.id === id ? { ...blog, ...updatedBlog } : blog
  );
  return blogs.find((blog) => blog.id === id);
};

// Delete a blog
const deleteBlog = (id) => {
  blogs = blogs.filter((blog) => blog.id !== id);
  return { success: true };
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};