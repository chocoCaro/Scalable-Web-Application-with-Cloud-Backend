import { useState, useEffect } from 'react';
import axios from 'axios';
import FilterButton from '../components/FilterButton';
import CreateButton from '../components/CreateButton';
import BlogBrief from '../components/BlogBrief';


export default function Home() {
  const [filtering, setFiltering] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const port = 8000;
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:${port}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        return;
      }
    };

    fetchBlogs();
  }, []);

  const handleNewBlog = (newBlog) => {
    if (!filtering) {
      setBlogs([newBlog, ...blogs]);
    }
  };

  const handleFilter = async (topic) => {
    try {
      const response = await axios.get(`http://localhost:${port}/api/blogs?topic=${topic}`);
      setBlogs(response.data);
      setFiltering(true);
    } catch (error) {
      console.error('Error fetching filtered blogs:', error);
      alert('Error fetching filtered blogs');
    }
  };

  return (
    <div className='w-[800px]'>
      <div className='w-full bg-white p-[20px] rounded-lg shadow-[2px_2px_10px_rgba(0,0,0,0.1)]'>
        <div className='flex items-center justify-between mb-[20px]'>
          <p className='ml-[5px] text-3xl text-black font-bold'>Blog List</p>
          <div className='flex gap-[15px]'>
            <FilterButton onSuccess={handleFilter} />
            <CreateButton onSuccess={handleNewBlog} />
          </div>
        </div>
        <div className='flex flex-col gap-[20px]'>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogBrief
                key={blog.id}
                id={blog.id}
                title={blog.title}
                date={blog.createdAt.split('T')[0]}
                topics={blog.topics}
                content={blog.content}
              />
            ))
          ) : (
            <p className='text-xl text-black'>There is no blogs.</p>
          )}
        </div>
      </div>
    </div>
  );
};
