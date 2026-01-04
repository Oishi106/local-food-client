import { Link } from 'react-router';
import {
  Facebook,
  Twitter,
  Instagram,
  Mail
} from 'lucide-react';
import { LuRotate3D } from 'react-icons/lu';


const Footer = () => {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#F89880] py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center space-x-2">
           
            <span className="text-xl font-bold text-gray-900">Local Food Lovers Network</span>
          </div>
          <ul className="space-y-2 mt-4">
            <li><Link to="/all-items" className="text-gray-800 hover:text-white transition">All Food Items</Link></li>
            <li><Link to="/add-Review" className="text-gray-800 hover:text-white transition">Add Food</Link></li>
            <li><Link to="/profile" className="text-gray-800 hover:text-white transition">Profile</Link></li>
            <li><Link to="/auth/login" className="text-gray-800 hover:text-white transition">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-900">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-800 hover:text-white transition">Learning Blog</Link></li>
            <li><Link to="/" className="text-gray-800 hover:text-white transition">Guides</Link></li>
            <li><Link to="/" className="text-gray-800 hover:text-white transition">Poly Tips</Link></li>
            <li><Link to="/" className="text-gray-800 hover:text-white transition">Resources</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-900">Community</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-800 hover:text-white transition">Discussion Forums</Link></li>
            <li><Link to="/" className="text-gray-800 hover:text-white transition">Study Groups</Link></li>
            <li><Link to="/" className="text-gray-800 hover:text-white transition">Events & Workshops</Link></li>
            <li><Link to="/" className="text-gray-800 hover:text-white transition">Leaderboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-900">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-white transition">
              <Facebook size={24} />
            </a>
            
            

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-white transition">
              <img className='w-[25px]' src="twitter.png" alt="" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-white transition">
              <Instagram size={24} />
            </a>

          </div>
          <div>
            <a
              href="mailto:support@nihonlearn.com"
              className="flex items-center text-gray-800 hover:text-white transition"
            >
              
            </a>
          </div>
        </div>
      </div>


      <div className="border-t border-gray-800/20 lg:mb-0 md:mb-0 mb-20 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-800">
          © {currentYear} Local Food Lovers Network. All Rights Reserved.
          <span className="ml-4">
            <Link to="/" className="hover:text-white transition mr-3">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition">Terms of Service</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;