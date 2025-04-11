import { Film, Ticket, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold">CinemaPlus</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="hover:text-red-500 transition-colors">
              Home
            </Link>
            <Link to="/my-tickets" className="hover:text-red-500 transition-colors flex items-center space-x-1">
              <Ticket className="h-4 w-4" />
              <span>My Tickets</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}