import { movies } from '../data/movies';
import MovieCard from '../components/MovieCard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Now Showing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
