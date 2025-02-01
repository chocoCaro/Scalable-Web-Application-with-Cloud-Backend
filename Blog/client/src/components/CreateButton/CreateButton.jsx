import axios from 'axios';
import './CreateButton.css';

export default function CreateButton({ onSuccess }) {
  const handleCreate = async () => {
    const title = prompt('Enter post title:');
    const content = prompt('Enter post content:');
    
    if (title && content) {
      try {
        await axios.post('http://localhost:5000/api/blogs', { title, content });
        onSuccess();
      } catch (error) {
        console.error('Error creating blog:', error);
      }
    }
  };

  return (
    <button className="create-btn" onClick={handleCreate}>
      + New Post
    </button>
  );
}