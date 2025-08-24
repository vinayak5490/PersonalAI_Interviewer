import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 md:flex md:justify-between md:items-start">
        {/* Brand and description */}
        <div className="mb-8 md:mb-0 max-w-sm">
          <h2 className="text-3xl font-extrabold text-white">
            Interview <span className="text-blue-500">Coach</span>
          </h2>
          <p className="mt-4 text-gray-400">
            Your partner to mastering interviews with expert coaching and tips.
          </p>
          <div className="mt-6 flex space-x-4">
            {/* Social icons placeholder */}
            <a href="#" className="hover:text-blue-500 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Instagram
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition">About</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Careers</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Blog</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition">Tutorials</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Webinars</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Community</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Events</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Social</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Interview Coach. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
