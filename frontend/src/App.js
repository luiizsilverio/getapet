import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Home from './pages/home';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
