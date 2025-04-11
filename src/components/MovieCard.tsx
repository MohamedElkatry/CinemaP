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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-[400px] object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{movie.title}</h3>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-gray-700">{movie.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {movie.description}
        </p>
        <Link
          to={`/movies/${movie.id}`}
          className="block w-full bg-red-500 text-white text-center py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}