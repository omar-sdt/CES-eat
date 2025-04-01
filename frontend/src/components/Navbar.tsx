import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="text-white w-full flex flex-row position-sticky top-0 z-50">
      <div className="bg-black pl-4 pr-6 py-2">
        <Link to="/" className="">
          <img src="/logo-navbar.svg" alt="Logo" className="inline-block mr-2" />
        </Link>
      </div>

      <div className='bg-white w-full'>

      </div>
    </nav >
  );
}

export default Navbar