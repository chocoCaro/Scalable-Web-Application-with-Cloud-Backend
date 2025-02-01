import { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogContent.css';

export default function BlogContent({ blogId }) {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs/${blogId}');
        setBlog(response.data);
      } catch (error) {
        console.error('Error loading blog:', error);
      }
    };
    loadBlog();
  }, [blogId]);

  if (!blog) return <div className="loading">Loading...</div>;

  return (
    <article className="blog-content">
      <h1 className="blog-title">{blog.title}</h1>
      <div className="blog-meta">
        <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="blog-body">{blog.content}</p>
    </article>
  );
}