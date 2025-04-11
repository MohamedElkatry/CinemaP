import { QrCode } from 'lucide-react';
import { useBookings } from '../context/BookingContext';

export default function MyTicketsPage() {
  const { bookings } = useBookings();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tickets</h1>
        
        {bookings.length === 0 ? (
          <div className="text-center text-gray-500">
            No tickets booked yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
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
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                          {booking.movieTitle}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          {new Date(booking.date).toLocaleDateString()} at{' '}
                          {booking.showtime}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {booking.seats.map((seat) => (
                            <span
                              key={seat}
                              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                            >
                              {seat}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <QrCode className="h-24 w-24 text-gray-900" />
                        <span className="mt-2 text-sm text-gray-500">
                          #{booking.id}
                        </span>
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