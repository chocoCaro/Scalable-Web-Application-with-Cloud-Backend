// src/pages/BlogCreate.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BlogCreate() {
  const [blog, setBlog] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/blogs/${data.id}`);
      });
  };

  return (
    <div>
      <h1>Create New Blog</h1>
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
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default BlogCreate;
