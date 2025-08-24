import { Button } from "../ui/button";
import { Bell, UserCircle } from "lucide-react"; // Optional: lucide-react for icons

export default function Navbar() {
  return (
    <div className="bg-white shadow-md">
      <nav className="max-w-7xl mx-20 mt-6 py-6 px-6 h-20 flex items-center justify-between">
        {/* Logo with avatar */}

        <div className="flex gap-6">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-gray-900">
              Interview <span className="text-blue-600">Coach</span>
            </h1>
          </div>
          <div className="flex items-center space-x-8">
            <Button className="cursor-pointer hover:bg-blue-700">Home</Button>
            <Button className="cursor-pointer hover:bg-blue-700">
              Explore
            </Button>
            <Button className="cursor-pointer hover:bg-blue-700">
              Courses
            </Button>
            <Button className="cursor-pointer hover:bg-blue-700">
              About us
            </Button>

            <div className="hidden md:flex gap-x-2 rounded-md p-1">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 flex-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <Button className="bg-blue-500 text-white px-4 hover:bg-blue-600 rounded-md">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Links + Search */}

        {/* Action Buttons + Extra content */}
        <div className="flex items-center space-x-3">
          {/* Notification bell icon */}
          <Button
            variant="ghost"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Bell className="w-5 h-5 text-blue-600" />
          </Button>
          {/* User avatar */}
          <UserCircle className="w-8 h-8 text-gray-400" />

          {/* Get Started Button */}
          <Button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600">
            Get Started
          </Button>
          {/* Login/Signup */}
          <Button className="bg-white text-gray-800 border border-gray-300 hover:bg-blue-600 hover:text-white px-5 py-2 rounded-lg">
            Login
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg">
            Signup
          </Button>
        </div>
      </nav>
    </div>
  );
}
