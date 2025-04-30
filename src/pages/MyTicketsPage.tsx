import { QrCode, Trash2 } from 'lucide-react';
import { useBookings } from '../context/BookingContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MyTicketsPage() {
  const { getUserBookings, deleteBooking } = useBookings();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState(getUserBookings());

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/CinemaP/login', { state: { from: '/CinemaP/my-tickets' } });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setUserBookings(getUserBookings());
  }, [getUserBookings]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Tickets</h1>
        
        {userBookings.length === 0 ? (
          <div className="text-center text-gray-400">
            No tickets booked yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {userBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="md:flex">
                  <img
                    src={booking.poster}
                    alt={booking.movieTitle}
                    className="w-full md:w-48 h-48 object-cover"
                  />
                  
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-white mb-2">
                          {booking.movieTitle}
                        </h2>
                        <p className="text-gray-400 mb-4">
                          {new Date(booking.date).toLocaleDateString()} at{' '}
                          {booking.showtime}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {booking.seats.map((seat) => (
                            <span
                              key={seat}
                              className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                            >
                              {seat}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-4">
                        <QrCode className="h-24 w-24 text-red-500" />
                        <span className="text-sm text-gray-400">
                          #{booking.id}
                        </span>
                        <button
                          onClick={() => {
                            deleteBooking(booking.id);
                            setUserBookings(getUserBookings());
                          }}
                          className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
