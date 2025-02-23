import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Detail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className='loading'>Loading...</div>
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        navigate('/');
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className='w-[1200px]'>
      <div className='px-[40px] py-[30px] bg-white rounded-[15px] shadow-[2px_2px_10px_rgba(0,0,0,0.1)]'>
        <div className='flex flex-cols gap-[20px] mb-[20px]'>
          <div className='w-[750px]'>
            <p className='text-4xl text-black'>{blog.title}</p>
            <p className='mt-[5px] text-[#555555]'>{blog.createdAt}</p>
          </div>
          <div className='flex flex-wrap gap-[10px] justify-end w-[350px]'>
            {blog.topic.map((topic, index) => (
              <span
                key={index}
                className='flex items-center justify-center h-[30px] px-[8px] bg-[#0195f7] rounded-[10px] text-white'
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        <p className='text-black'>{blog.content}</p>
        <div className='grid grid-cols-2 gap-[30px] h-[50px] mt-[20px] font-bold text-lg'>
          <button
            onClick={handleEdit}
            className='bg-white rounded-[15px] border border-black text-black hover:cursor-pointer'
          >
            Edit Post
          </button>
          <button
            onClick={handleDelete}
            className='bg-[#ff0000] rounded-[15px] hover:cursor-pointer'
          >
            Delete Post
          </button>
        </div>
      </div>

      {edit && (
        <div className='flex items-center justify-center fixed w-screen h-screen top-0 left-0 bg-[#00000080] rounded-[15px] z-50'>
          <div className='w-[900px] h-[800px] bg-white rounded-[15px]'>
            <div className='flex items-center justify-between h-[50px] px-[15px] font-bold'>
              <p
                onClick={() => setEdit(false)}
                className='text-lg text-[#b4b4b4] hover:cursor-pointer'
              >
                Cancel
              </p>
              <p className='text-2xl text-black'>Edit Post</p>
              <p
                onClick={() => setEdit(false)}
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
                  className='w-full h-[70px] p-[10px] border border-[#b0b0b0] rounded-[15px] resize-none'
                >
                  {blog.title}
                </textarea>
              </div>
              <div className='h-[570px] mt-[15px]'>
                <p className='ml-[5px] text-xl font-bold'>Content</p>
                <textarea
                  name='title'
                  className='w-full h-full p-[10px] border border-[#b0b0b0] rounded-[15px] resize-none'
                >
                  {blog.content}
                </textarea>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
