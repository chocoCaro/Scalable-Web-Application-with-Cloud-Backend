// src/pages/Home.jsx
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <p>Explore interesting articles and insights.</p>
      <Link to="/blogs">Go to Blog List</Link>
    </div>
  );
}

export default Home;
