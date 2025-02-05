import React from "react";
import { Link } from "react-router-dom";
import "./BlogBrief.css";

const BlogBrief = ({ key, title, date, topics, content }) => {
  return (
    <Link to={`/blog/${key}`} className="blog-brief">
      <div className="blog-header">
        <h2 className="blog-title">{title}</h2>
        <div className="blog-topics">
          {topics.map((topic, index) => (
            <span key={index} className="blog-topic">
              {topic}
            </span>
          ))}
        </div>
      </div>
      <p className="blog-date">{date}</p>
      <p className="blog-content">{content}</p>
    </Link>
  );
};

export default BlogBrief;
