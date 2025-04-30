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

  const handleBookNow = () => {
    if (!selectedShowtime) return;
    navigate(`/CinemaP/movies/${id}/seats`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-1" />
                <span>{movie.duration}</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6">{movie.description}</p>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Select Showtime</h2>
              <div className="grid grid-cols-3 gap-4">
                {movie.showtimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedShowtime(time)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedShowtime === time
                        ? 'bg-red-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleBookNow}
              disabled={!selectedShowtime}
              className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium disabled:opacity-50"
            >
              Book Now
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="space-y-6">
            {movie.reviews.map((review) => (
              <div key={review.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.user}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmitReview} className="mt-8">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <div className="mb-4">
              <StarRating
                rating={newReview.rating}
                onRatingChange={(rating) =>
                  setNewReview({ ...newReview, rating })
                }
              />
            </div>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Write your review..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
              rows={4}
            />
            <button
              type="submit"
              className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
