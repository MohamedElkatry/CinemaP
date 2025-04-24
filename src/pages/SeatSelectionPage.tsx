import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import { useUser } from '../context/UserContext';
import { movies } from '../data/movies';
import SeatMap from '../components/SeatMap';

interface Seat {
  id: string;
  row: number;
  number: number;
  status: 'available' | 'booked' | 'selected';
}

export default function SeatSelectionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addBooking, getBookedSeats } = useBookings();
  const { isAuthenticated } = useUser();
  const movie = movies.find((m) => m.id === id);

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/movies/${id}/seats` } });
      return;
    }

    const bookedSeats = getBookedSeats(id || '');

    const initialSeats: Seat[] = Array.from({ length: 100 }, (_, i) => {
      const seatId = `seat-${i + 1}`;
      const seatNumber = (i % 10) + 1;
      return {
        id: seatId,
        row: Math.floor(i / 10) + 1,
        number: seatNumber,
        status: bookedSeats.includes(seatId) ? 'booked' : 'available',
      };
    });

    setSeats(initialSeats);
  }, [id, isAuthenticated, navigate, getBookedSeats]);

  const handleSeatSelect = (seatId: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/movies/${id}/seats` } });
      return;
    }

    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.status === 'booked') return;

    const newSeats = seats.map((s) =>
      s.id === seatId
        ? { ...s, status: s.status === 'selected' ? 'available' : 'selected' }
        : s
    );
    setSeats(newSeats);

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirmBooking = () => {
    if (!movie || !isAuthenticated) return;

    const booking = {
      id: Date.now().toString(),
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: movie.showtimes[0],
      seats: selectedSeats,
      date: new Date().toISOString(),
      poster: movie.poster,
    };

    addBooking(booking);
    navigate('/my-tickets');
  };

  if (!movie || !isAuthenticated) {
    return <div>Movie not found or please login first</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#1E3A8A]">Select Your Seats</h1>

          <div className="mb-8">
            <div className="w-full max-w-3xl mx-auto bg-gray-900 h-2 rounded-lg mb-8" />
            <p className="text-center text-sm text-gray-500 mb-8">SCREEN</p>

            <SeatMap seats={seats} onSeatSelect={handleSeatSelect} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-[#1E3A8A]">Selected Seats</h2>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seatId) => {
                const seat = seats.find((s) => s.id === seatId);
                return (
                  <span
                    key={seatId}
                    className="px-3 py-1 bg-[#FFD700] text-[#1E3A8A] rounded-full text-sm"
                  >
                    Row {seat?.row}, Seat {seat?.number}
                  </span>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleConfirmBooking}
            className="mt-8 w-full bg-[#1E3A8A] text-white py-3 rounded-lg hover:bg-[#0C2C6C] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={selectedSeats.length === 0}
          >
            Confirm Booking ({selectedSeats.length} seats)
          </button>
        </div>
      </div>
    </div>
  );
}
