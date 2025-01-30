// src/pages/BlogDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <Link to={`/blogs/${id}/edit`}>Edit Blog</Link>
    </div>
  );
}

export default BlogDetail;
