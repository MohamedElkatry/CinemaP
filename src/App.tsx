import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import MyTicketsPage from './pages/MyTicketsPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <UserProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <Routes>
              <Route path="/CinemaP/" element={<HomePage />} />
              <Route path="/CinemaP/movies/:id" element={<MovieDetailsPage />} />
              <Route path="/CinemaP/movies/:id/seats" element={<SeatSelectionPage />} />
              <Route path="/CinemaP/my-tickets" element={<MyTicketsPage />} />
              <Route path="/CinemaP/login" element={<AuthPage />} />
              <Route path="*" element={<div className="text-center text-2xl">404 Not Found</div>} />
            </Routes>
          </div>
        </Router>
      </BookingProvider>
    </UserProvider>
  );
}

export default App;