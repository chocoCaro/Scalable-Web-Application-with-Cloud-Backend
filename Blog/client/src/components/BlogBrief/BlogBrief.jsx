import React from "react";
import "./BlogBrief.css";

const BlogBrief = ({ title, date, topics, content }) => {
  return (
    <div className="blog-brief">
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
    </div>
  );
};

export default BlogBrief;
