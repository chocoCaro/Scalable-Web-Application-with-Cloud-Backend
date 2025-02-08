import { useState, useEffect } from "react";
import axios from "axios";
import CreateButton from "../../components/CreateButton";
import BlogBrief from "../../components/BlogBrief/BlogBrief";
import "./Home.css";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        alert("Error fetching blogs");
      }
    };

    fetchBlogs();
  }, []);

  const handleNewBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <h1>Blog List</h1>
          <CreateButton onSuccess={handleNewBlog} />
        </div>
        <div className="blog-list">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogBrief
                key={blog.id}
                title={blog.title}
                date={blog.createdAt.split("T")[0]} // Format ngày tháng
                topics={blog.topics}
                content={blog.content}
              />
            ))
          ) : (
            <p className="no-blogs">Chưa có bài viết nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}