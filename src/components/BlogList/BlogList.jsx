import { Link } from 'react-router-dom';
import './BlogList.css';

export default function BlogList({ blogs }) {
  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <article key={blog.id} className="blog-card">
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
          <Link to={`/blog/${blog.id}`} className="blog-read-more">
            Read More →
          </Link>
        </article>
      ))}
    </div>
  );
}