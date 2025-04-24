import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser } from './UserContext';

interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  showtime: string;
  seats: string[]; // seat.id list
  date: string;
  poster: string;
  userId: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'userId'>) => void;
  deleteBooking: (bookingId: string) => void;
  getUserBookings: () => Booking[];
  getBookedSeats: (movieId: string) => string[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });
  const { token } = useUser();

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking: Omit<Booking, 'userId'>) => {
    if (!token) return;
    
    const newBooking = { ...booking, userId: token };
    setBookings(prev => {
      const updated = [...prev, newBooking];
      localStorage.setItem('bookings', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteBooking = (bookingId: string) => {
    setBookings(prev => {
      const updated = prev.filter(booking => booking.id !== bookingId);
      localStorage.setItem('bookings', JSON.stringify(updated));
      return updated;
    });
  };

  const getUserBookings = () => {
    if (!token) return [];
    return bookings.filter(booking => booking.userId === token);
  };

  const getBookedSeats = (movieId: string) => {
    const movieBookings = bookings.filter(b => b.movieId === movieId);
    const bookedSeats: string[] = [];
    movieBookings.forEach(booking => {
      booking.seats.forEach(seatId => bookedSeats.push(seatId));
    });
    return bookedSeats;
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, deleteBooking, getUserBookings, getBookedSeats }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookings must be used within a BookingProvider');
  return context;
}
