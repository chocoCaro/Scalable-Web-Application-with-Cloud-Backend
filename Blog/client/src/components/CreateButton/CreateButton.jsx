import { useState } from "react";
import axios from "axios";
import "./CreateButton.css";

export default function CreateButton({ onSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [content, setContent] = useState("");

  const availableTopics = ["Technology", "Programming", "Travel", "Health", "Sport"];

  const handleCreate = async () => {
    if (!title || !content || topics.length === 0) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/blogs", {
        title,
        topics,
        content,
      });
      onSuccess(response.data); // Gửi dữ liệu mới tạo lên component cha
      setShowModal(false);
      setTitle("");
      setTopics([]);
      setContent("");
    } catch (error) {
      console.error("Lỗi khi tạo blog:", error);
      alert("Đã xảy ra lỗi khi tạo bài viết!");
    }
  };

  const handleTopicChange = (event) => {
    const selectedTopic = event.target.value;
    if (selectedTopic && !topics.includes(selectedTopic)) {
      setTopics([...topics, selectedTopic]);
    }
  };

  const removeTopic = (topic) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  return (
    <>
      <button className="create-btn" onClick={() => setShowModal(true)}>
        + New Post
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Blog</h2>
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select onChange={handleTopicChange}>
              <option value="">Select Topics</option>
              {availableTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            <div className="selected-topics">
              {topics.map((topic) => (
                <span key={topic} className="topic-badge">
                  {topic} <button onClick={() => removeTopic(topic)}>x</button>
                </span>
              ))}
            </div>

            <textarea
              placeholder="Content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button className="submit-btn" onClick={handleCreate}>
              Post
            </button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}