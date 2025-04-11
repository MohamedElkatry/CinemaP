import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
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
  const { addBooking } = useBookings();
  const movie = movies.find((m) => m.id === id);

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // ⬇️ تحميل المقاعد المحجوزة من localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`bookedSeats-${id}`);
    const bookedSeatIds: string[] = stored ? JSON.parse(stored) : [];

    const initialSeats: Seat[] = Array.from({ length: 100 }, (_, i) => {
      const seatId = `seat-${i + 1}`;
      return {
        id: seatId,
        row: Math.floor(i / 10) + 1,
        number: (i % 10) + 1,
        status: bookedSeatIds.includes(seatId) ? 'booked' : 'available',
      };
    });

    setSeats(initialSeats);
  }, [id]);

  const handleSeatSelect = (seatId: string) => {
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
    if (!movie) return;

    // 1. حفظ بيانات الحجز
    const booking = {
      id: Date.now().toString(),
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: movie.showtimes[0],
      seats: selectedSeats.map((seatId) => {
        const seat = seats.find((s) => s.id === seatId);
        return `Row ${seat?.row}, Seat ${seat?.number}`;
      }),
      date: new Date().toISOString(),
      poster: movie.poster,
    };

    addBooking(booking);

    // 2. حفظ المقاعد المحجوزة في localStorage
    const stored = localStorage.getItem(`bookedSeats-${movie.id}`);
    const previousSeats: string[] = stored ? JSON.parse(stored) : [];
    const updatedSeats = [...new Set([...previousSeats, ...selectedSeats])];
    localStorage.setItem(`bookedSeats-${movie.id}`, JSON.stringify(updatedSeats));

    // 3. الذهاب إلى صفحة التذاكر
    navigate('/my-tickets');
  };

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-8">Select Your Seats</h1>

          <div className="mb-8">
            <div className="w-full max-w-3xl mx-auto bg-gray-900 h-2 rounded-lg mb-8" />
            <p className="text-center text-sm text-gray-500 mb-8">SCREEN</p>

            <SeatMap seats={seats} onSeatSelect={handleSeatSelect} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Selected Seats</h2>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seatId) => {
                const seat = seats.find((s) => s.id === seatId);
                return (
                  <span
                    key={seatId}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    Row {seat?.row}, Seat {seat?.number}
                  </span>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleConfirmBooking}
            className="mt-8 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={selectedSeats.length === 0}
          >
            Confirm Booking ({selectedSeats.length} seats)
          </button>
        </div>
      </div>
    </div>
  );
}
