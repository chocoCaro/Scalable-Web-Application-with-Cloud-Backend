import { useState, useEffect } from "react";
import axios from "axios";
import CreateButton from "../../components/CreateButton/CreateButton";
import BlogBrief from "../../components/BlogBrief/BlogBrief";
import "./Home.css";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  // Tải dữ liệu blog từ API (dành cho sau này khi kết nối với cơ sở dữ liệu)
  // const loadBlogs = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/blogs");
  //     setBlogs(response.data);
  //   } catch (error) {
  //     console.error("Error loading blogs:", error);
  //   }
  // };

  // Tạo blog mẫu để hiển thị khi chưa có kết nối API
  const sampleBlogs = [
    {
      title: "Giới thiệu về React",
      date: "2025-02-03",
      topics: ["React", "JavaScript", "Web Development"],
      content: "React là một thư viện JavaScript được dùng để xây dựng giao diện người dùng."
    },
    {
      title: "Cách sử dụng Axios trong React",
      date: "2025-01-28",
      topics: ["React", "Axios", "HTTP Requests"],
      content: "Axios là một thư viện JavaScript giúp bạn gửi các HTTP request dễ dàng từ client."
    },
    {
      title: "Hướng dẫn sử dụng useState và useEffect",
      date: "2025-01-20",
      topics: ["React", "useState", "useEffect"],
      content: "useState và useEffect là hai hook cơ bản trong React giúp quản lý trạng thái và hiệu ứng phụ."
    }
  ];

  // Thay vì gọi API, sử dụng blog mẫu
  const loadBlogs = () => {
    setBlogs(sampleBlogs);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <h1>Blog List</h1>
          <CreateButton onSuccess={loadBlogs} />
        </div>

        <div className="blog-list">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <BlogBrief key={index} title={blog.title} date={blog.date} topics={blog.topics} content={blog.content} />
            ))
          ) : (
            <p className="no-blogs">Chưa có bài viết nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}
