// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import BlogEdit from './pages/BlogEdit';
import BlogCreate from './pages/BlogCreate';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/:id/edit" element={<BlogEdit />} />
          <Route path="/blogs/new" element={<BlogCreate />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
