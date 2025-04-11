export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  rating: number;
  genre: string[];
  duration: string;
  releaseDate: string;
}

export interface ShowTime {
  id: string;
  movieId: string;
  datetime: string;
  price: number;
}

export interface Seat {
  id: string;
  row: number;
  number: number;
  status: 'available' | 'booked' | 'selected';
}

export interface Booking {
  id: string;
  movieId: string;
  showTimeId: string;
  seats: string[];
  userId: string;
  bookingDate: string;
  totalAmount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}