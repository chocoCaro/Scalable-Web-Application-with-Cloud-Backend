import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        
        <main className="app-main">
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<Detail />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
