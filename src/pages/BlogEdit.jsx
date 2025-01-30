// src/pages/BlogEdit.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    })
      .then((response) => response.json())
      .then(() => {
        navigate(`/blogs/${id}`);
      });
  };

  return (
    <div>
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default BlogEdit;
