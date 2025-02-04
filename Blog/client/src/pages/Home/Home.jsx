import { useState, useEffect } from "react";
import axios from "axios";
import CreateButton from "../../components/CreateButton/CreateButton";
import BlogBrief from "../../components/BlogBrief/BlogBrief";
import "./Home.css";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  // Tải dữ liệu blog từ API
  const loadBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error loading blogs:", error);
      alert("Đã xảy ra lỗi khi tải bài viết!");
    }
  };

  // Thêm bài viết mới vào danh sách
  const handleNewBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  // Tải dữ liệu khi component được render
  useEffect(() => {
    loadBlogs();
  }, []);

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