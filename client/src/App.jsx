import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import BecomeSitter from './pages/BecomeSitter';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/become-sitter" element={<BecomeSitter />} />
            <Route path="/booking/:sitterId" element={<Booking />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
