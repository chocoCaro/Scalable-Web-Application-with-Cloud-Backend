import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ActionButtons.css';

export default function ActionButtons({ blogId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete('http://localhost:5000/api/blogs/${blogId}');
        navigate('/');
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="action-buttons">
      <button 
        className="btn edit-btn"
        onClick={() => navigate('/blog/${blogId}/edit')}
      >
        Edit Post
      </button>
      <button 
        className="btn delete-btn"
        onClick={handleDelete}
      >
        Delete Post
      </button>
      <button 
        className="btn back-btn"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
}