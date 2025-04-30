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
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/CinemaP/movies/${movie.id}`}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/CinemaP/movies/${movie.id}`}>
          <h2 className="text-xl font-bold text-white mb-2 hover:text-red-500 transition-colors">
            {movie.title}
          </h2>
        </Link>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{movie.description}</p>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-500 mr-1" />
          <span className="text-white">{movie.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
