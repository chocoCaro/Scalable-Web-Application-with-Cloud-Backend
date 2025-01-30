// src/pages/BlogList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <div className="blog-list">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
