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
    <footer className="bg-linear-to-r from-cyan-900 to-indigo-100


 py-8 px-4  rounded-xl mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-white">
           
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Local Food Lovers Network</span>
          </div>
          <ul className="space-y-2 mt-4">
            <li><Link to="/all-items" className="text-gray-700 dark:text-gray-200 hover:text-blue-800">All Food Items</Link></li>
            <li><Link to="/add-Review" className="text-gray-700 dark:text-gray-200 hover:text-blue-800">Add Food</Link></li>
            <li><Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-blue-800">Profile</Link></li>
            <li><Link to="/auth/login" className="text-gray-700 dark:text-gray-200 hover:text-blue-800">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">Learning Blog</Link></li>
            <li><Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">Guides</Link></li>
            <li><Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">Poly Tips</Link></li>
            <li><Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">Resources</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Community</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">Discussion Forums</Link></li>
            <li><Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">Study Groups</Link></li>
            <li><Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">Events & Workshops</Link></li>
            <li><Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">Leaderboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">
              <Facebook size={24} />
            </a>
            
            

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">
              <img className='w-[25px] text-gray-600 dark:text-gray-200 hover:text-blue-800' src="twitter.png" alt="" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-200 hover:text-blue-800">
              <Instagram size={24} />
            </a>

          </div>
          <div>
            <a
              href="mailto:support@nihonlearn.com"
              className="flex items-center text-gray-600 dark:text-gray-200 hover:text-blue-800"
            >
              
            </a>
          </div>
        </div>
      </div>


      <div className="border-t lg:mb-0 md:mb-0 mb-20 border-[#0e204579] mt-8 pt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-200">
          © {currentYear} Local Food Lovers Network. All Rights Reserved.
          <span className="ml-4">
            <Link to="/" className="hover:text-blue-800 mr-3">Privacy Policy</Link>
            <Link to="/" className="hover:text-blue-800">Terms of Service</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;