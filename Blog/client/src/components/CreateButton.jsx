import { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';

export default function CreateButton({ onSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [topics, setTopics] = useState([]);
  const [topicsDropdown, setTopicsDropdown] = useState(false);

  const availableTopics = ['Technology', 'Programming', 'Travel', 'Health', 'Sport'];

  const handleCreate = async () => {
    const title = document.querySelector('textarea[name="title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;

    if (!title || topics.length === 0 || !content) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/blogs', {
        title,
        topics,
        content,
      });
      
      onSuccess(response.data);
      setShowModal(false);
      setTopics([]);
    } catch (error) {
      console.log('Error creating post:', error);
      return;
    }
  };

  const handleAddTopic = (topic) => {
    if (!topics.includes(topic)) {
      setTopics([...topics, topic]);
    };
  };

  const removeTopic = (topic) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className='w-[150px] h-[50px] rounded-[15px] border-2 border-black text-lg text-black font-bold hover:cursor-pointer hover:bg-[#f0f0f0]'
      >
        + New Post
      </button>

      {showModal && (
        <div className='fixed flex items-center justify-center w-screen h-screen top-0 left-0 bg-[#00000080] rounded-[15px] z-50'>
          <div className='w-[900px] h-[80vh] bg-white rounded-[15px]'>
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
              <>
                <p className='ml-[5px] text-xl font-bold'>Title</p>
                <textarea
                  name='title'
                  placeholder='Type your title...'
                  className='w-full h-[70px] p-[10px] border border-[#b0b0b0] rounded-[15px] resize-none'
                />
              </>
              <div className='mt-[15px]'>
                <p className='ml-[5px] text-xl font-bold'>Topics</p>
                <div className='flex flex-cols gap-[15px] h-[50px]'>
                  <button
                    onClick={() => setTopicsDropdown(!topicsDropdown)}
                    className={clsx(
                      'flex items-center justify-center w-[150px] border hover:cursor-pointer',
                      {
                        'rounded-[15px]': !topicsDropdown,
                        'rounded-t-[15px] border-b-0': topicsDropdown,
                      }
                    )}
                  >
                    Select topics
                  </button>

                  {topics.length > 0 && (
                    <img src='https://img.icons8.com/?size=100&id=p90OKvX0D1vE&format=png&color=000000' />
                  )}

                  <div className='flex flex-wrap gap-[15px]'>
                    {topics.map((topic) => (
                      <span key={topic} className='flex items-center justify-center gap-[5px] px-[10px] bg-[#e0e0e0] rounded-[15px]'>
                        {topic}
                        <button
                          onClick={() => removeTopic(topic)}
                          className='text-red-500 font-bold hover:cursor-pointer'
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {topicsDropdown && (
                <ul className='absolute w-[150px] h-[90px] bg-white border rounded-b-[15px] overflow-y-scroll'>
                  {availableTopics.map((topic) => (
                    <li
                      key={topic}
                      onClick={() => handleAddTopic(topic)}
                      className='flex items-center justify-center w-full h-[30px] hover:cursor-pointer hover:bg-[#e0e0e0]'
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              )}

              <div className='h-[478px] mt-[15px]'>
                <p className='ml-[5px] text-xl font-bold'>Content</p>
                <textarea
                  name='content'
                  placeholder='Type something...'
                  className='w-full h-[calc(80vh-323px)] p-[10px] border border-[#b0b0b0] rounded-[15px] resize-none'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
