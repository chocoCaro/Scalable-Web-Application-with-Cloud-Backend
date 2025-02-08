import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detail from './pages/Detail';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='flex justify-center min-h-screen py-[110px] bg-[#f0f0f0]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog/:id' element={<Detail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};
