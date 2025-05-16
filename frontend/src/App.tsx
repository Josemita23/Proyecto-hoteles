import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HotelList from './pages/HotelList';
import HotelForm from './pages/HotelForm';
import BookingList from './pages/BookingList';
import BookingForm from './pages/BookingForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel" element={<HotelList />} />
        <Route path="/hotel/new" element={<HotelForm />} />
        <Route path="/hotel/:id" element={<HotelForm />} />
        <Route path="/booking" element={<BookingList />} />
        <Route path="/booking/new" element={<BookingForm />} />
        <Route path="/booking/:id" element={<BookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
