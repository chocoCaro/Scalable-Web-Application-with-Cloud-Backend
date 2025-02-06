import { useState } from "react";
import axios from "axios";

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
      <button
        onClick={() => setShowModal(true)}
        className="w-[120px] h-[50px] bg-[#0195f7] rounded-[15px] text-lg text-white font-bold hover:cursor-pointer"
      >
        New Post
      </button>

      {showModal && (
        <div className='fixed flex items-center justify-center w-screen h-screen top-0 left-0 bg-[#00000080] rounded-[15px] z-50'>
          <div className='w-[900px] h-[800px] bg-white rounded-[15px]'>
            <div className='flex items-center justify-between h-[50px] px-[15px] font-bold'>
              <p
                onClick={() => setShowModal(false)}
                className='text-lg text-[#b4b4b4] hover:cursor-pointer'
              >
                Cancel
              </p>
              <p className='text-2xl text-black'>Create Post</p>
              <p
                onClick={handleCreate}
                className='text-lg text-[#0195f7] hover:cursor-pointer'
              >
                Done
              </p>
            </div>
            <hr className='border-t-1 border-black' />
            <div className='px-[15px] py-[20px] text-black'>
              <div>
                <p className='ml-[5px] text-xl font-bold'>Title</p>
                <textarea
                  name='title'
                  placeholder="Type your title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full h-[70px] p-[10px] border border-[#b0b0b0] rounded-[15px] resize-none'
                />
              </div>
              <div className='mt-[15px]'>
                <p className='ml-[5px] text-xl font-bold'>Topics</p>
                <div className='flex flex-cols'>
                  <select onChange={handleTopicChange}>
                    <option value="">Select Topics</option>
                    {availableTopics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-wrap h-[70px]">
                    {topics.map((topic) => (
                      <span key={topic} className="flex items-center bg-[#e0e0e0]">
                        {topic} <button onClick={() => removeTopic(topic)}>x</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className='h-[500px] mt-[15px]'>
                <p className='ml-[5px] text-xl font-bold'>Content</p>
                <textarea
                  name='title'
                  placeholder="Type something..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className='w-full h-full p-[10px] border border-[#b0b0b0] rounded-[15px] resize-none'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}