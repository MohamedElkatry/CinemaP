import { useState } from 'react';

interface Seat {
  id: string;
  row: number;
  number: number;
  status: 'available' | 'booked' | 'selected';
}

interface SeatMapProps {
  seats: Seat[];
  onSeatSelect: (seatId: string) => void;
}

export default function SeatMap({ seats, onSeatSelect }: SeatMapProps) {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  const getStatusColor = (status: Seat['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600';
      case 'booked':
        return 'bg-red-500 cursor-not-allowed';
      case 'selected':
        return 'bg-blue-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-10 gap-2 p-4">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => seat.status === 'available' && onSeatSelect(seat.id)}
            onMouseEnter={() => setHoveredSeat(seat.id)}
            onMouseLeave={() => setHoveredSeat(null)}
            className={`
              w-8 h-8 rounded-t-lg relative
              ${getStatusColor(seat.status)}
              transition-colors duration-200
            `}
            disabled={seat.status === 'booked'}
          >
            {hoveredSeat === seat.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                Row {seat.row}, Seat {seat.number}
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center space-x-8 mt-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2" />
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2" />
          <span className="text-sm">Selected</span>
        </div>
      </div>
    </div>
  );
}