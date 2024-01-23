import { Link } from 'react-router-dom';

export default function Navbar() {
 return (
    <header className="relative z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="navbar-logo">
            <img className="h-8 w-auto" src="./assest/logo.svg" alt="" />
          </Link>
        </div>
        <ul className="hidden lg:flex lg:gap-x-12">
          <li>
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link to="/movie" className="text-sm font-semibold leading-6 text-gray-900">
              Movie
            </Link>
          </li>
          <li>
            <Link to="/tvshows" className="text-sm font-semibold leading-6 text-gray-900">
              Tv Shows
            </Link>
          </li>
        </ul>
      </nav>
    </header>
 );
}