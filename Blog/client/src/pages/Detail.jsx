import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Detail() {
  // const { id } = useParams();
  // const [blog, setBlog] = useState(null);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchBlog = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
  //       setBlog(response.data);
  //     } catch (error) {
  //       console.error('Error fetching blog:', error);
  //     }
  //   };

  //   fetchBlog();
  // }, [id]);

  // if (!blog) {
  //   return <div className='loading'>Loading...</div>
  // };

  const handleEdit = () => {
    setEdit(true);
  }

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

  const id = 1;
  const blog = {
    title: 'Introduction to React',
    createdAt: '05/02/2025',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus nec odio molestie ultrices. Nullam sit amet nunc auctor, vehicula nunc nec, fermentum elit. Nullam sit amet nunc auctor, vehicula nunc nec, fermentum elit. Nullam sit amet nunc auctor, vehicula nunc nec, fermentum elit. Nullam sit amet nunc auctor, vehicula nunc nec, fermentum elit. Nullam sit amet nunc auctor, vehicula nunc nec, fermentum elit. Nullam sit amet nunc auctor, vehicula nunc nec, fermentum elit. Nullam sit amet nunc auctor, vehicula nunc nec, fermentum elit. Nullam sit amet nunc auctor, vehicula nunc nec, fermentum elit.'
  }

  return (
    <>
      <div className='w-[1200px] px-[40px] py-[30px] bg-[#efefef] rounded-[15px]'>
        <p className='text-4xl text-black'>{blog.title}</p>
        <p className='mt-[5px] mb-[20px] text-[#555555]'>{blog.createdAt}</p>
        <p className='text-black'>{blog.content}</p>
        <div className='grid grid-cols-2 gap-[30px] h-[50px] mt-[20px] font-bold text-lg'>
          <button
            onClick={handleEdit}
            className='bg-[#0195f7] rounded-[15px] hover:cursor-pointer'
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

      {edit ? (
        <div className='flex items-center justify-center fixed w-screen h-screen top-0 left-0 bg-[#efefef]/70 rounded-[15px] z-50'>
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
              <p className=''>Title</p>
              <textarea
                name='title'
                className=''
              >
                {blog.title}
              </textarea>
              <p className=''>Tag</p>
              <textarea
                name='title'
                className=''
              >
                
              </textarea>
              <p className=''>Content</p>
              <textarea
                name='title'
                className=''
              >
                {blog.content}
              </textarea>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}