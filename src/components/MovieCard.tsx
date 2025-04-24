import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    description: string;
    poster: string;
    rating: number;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-[400px] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-semibold text-gray-900">{movie.title}</h3>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-2 text-lg font-medium text-gray-700">{movie.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{movie.description}</p>
        <Link
          to={`/movies/${movie.id}`}
          className="block w-full bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
