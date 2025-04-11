import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import StarRating from '../components/StarRating';
import { movies } from '../data/movies';

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);
  const [selectedShowtime, setSelectedShowtime] = useState<string>('');
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment.trim()) return;

    movie.reviews.push({
      id: Date.now().toString(),
      user: 'Anonymous User',
      rating: newReview.rating,
      comment: newReview.comment,
    });

    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full md:w-1/3 object-cover"
            />
            <div className="p-6 md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {movie.title}
              </h1>
              
              <div className="flex items-center mb-4">
                <StarRating rating={movie.rating} readonly />
                <span className="ml-2 text-gray-600">
                  ({movie.rating} / 5)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-1" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 mb-6">{movie.description}</p>

              <h2 className="text-xl font-bold mb-4">Available Showtimes</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {movie.showtimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedShowtime(time)}
                    className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                      selectedShowtime === time
                        ? 'bg-red-500 text-white border-red-500'
                        : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <button
                onClick={() => selectedShowtime && navigate(`/movies/${id}/seats`)}
                disabled={!selectedShowtime}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Choose Seats
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          
          {/* Add Review Form */}
          <form onSubmit={handleSubmitReview} className="mb-8">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <StarRating
                rating={newReview.rating}
                onRate={(rating) => setNewReview((prev) => ({ ...prev, rating }))}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Submit Review
            </button>
          </form>

          {/* Reviews List */}
          <div className="space-y-6">
            {movie.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h3 className="font-semibold mr-2">{review.user}</h3>
                    <StarRating rating={review.rating} readonly />
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}