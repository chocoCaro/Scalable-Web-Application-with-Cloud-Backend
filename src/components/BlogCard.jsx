// src/components/BlogCard.jsx
import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <Link to={`/blogs/${blog.id}`}>Read More</Link>
    </div>
  );
}

export default BlogCard;
