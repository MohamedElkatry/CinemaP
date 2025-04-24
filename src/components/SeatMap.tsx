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
        return 'bg-blue-500 hover:bg-blue-600';
      case 'booked':
        return 'bg-red-500 cursor-not-allowed';
      case 'selected':
        return 'bg-gray-900';
      default:
        return 'bg-gray-200';
    }
  };

  // تحويل رقم الصف إلى حرف (1 -> A, 2 -> B, etc.)
  const getRowLetter = (rowNumber: number) => {
    return String.fromCharCode(64 + rowNumber); // 65 is ASCII for 'A'
  };

  // تجميع المقاعد حسب الصفوف
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<number, Seat[]>);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col gap-4 p-4">
        {Object.entries(seatsByRow).map(([row, rowSeats]) => (
          <div key={row} className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-700">
              {getRowLetter(parseInt(row))}
            </div>
            <div className="flex-1 grid grid-cols-10 gap-2">
              {rowSeats.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => seat.status === 'available' && onSeatSelect(seat.id)}
                  onMouseEnter={() => setHoveredSeat(seat.id)}
                  onMouseLeave={() => setHoveredSeat(null)}
                  className={`
                    w-8 h-8 rounded-t-lg relative
                    ${getStatusColor(seat.status)}
                    transition-colors duration-200
                    ${seat.status === 'available' ? 'cursor-pointer' : 'cursor-not-allowed'}
                  `}
                  disabled={seat.status === 'booked'}
                >
                  {hoveredSeat === seat.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                      Row {getRowLetter(seat.row)}, Seat {seat.number}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-8 mt-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2" />
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-900 rounded mr-2" />
          <span className="text-sm">Selected</span>
        </div>
      </div>
    </div>
  );
}
