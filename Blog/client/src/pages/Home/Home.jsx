import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateButton from '../../components/CreateButton/CreateButton';
import BlogList from '../../components/BlogList/BlogList';
import './Home.css';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <div className="home-page">
      <CreateButton onSuccess={loadBlogs} />
      <BlogList blogs={blogs} />
    </div>
  );
}