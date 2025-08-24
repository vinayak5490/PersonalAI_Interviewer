import React from "react";
import { Button } from "../ui/button";

const HomePage = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">Interview Coach</span>
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Master your interviews with expert guidance, practice questions, and personalized coaching.
        </p>
        
      </section>

      {/* Features Section */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Personalized Coaching</h2>
          <p className="text-gray-600">
            Get one-on-one coaching tailored to your specific job search and goals.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Practice Interviews</h2>
          <p className="text-gray-600">
            Prepare with mock interviews & feedback to build confidence.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Resource Library</h2>
          <p className="text-gray-600">
            Access a library of interview tips, resume advice, and more.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
