"use client"
import React, { useRef } from 'react';

const LandingPage = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const demoRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref: any) => {
    window.scrollTo({
      top: ref.current.offsetTop - 50, // Adjust this value to account for navbar height
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white fixed w-full z-10 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">
            YourApp
          </div>
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection(heroRef)} className="cursor-pointer text-gray-600 hover:text-blue-600">
              Home
            </button>
            <button onClick={() => scrollToSection(featuresRef)} className="cursor-pointer text-gray-600 hover:text-blue-600">
              Features
            </button>
            <button onClick={() => scrollToSection(demoRef)} className="cursor-pointer text-gray-600 hover:text-blue-600">
              Demo
            </button>
            <button onClick={() => scrollToSection(testimonialsRef)} className="cursor-pointer text-gray-600 hover:text-blue-600">
              Testimonials
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="cursor-pointer text-gray-600 hover:text-blue-600">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header ref={heroRef} className="pt-24 bg-gradient-to-r from-blue-500 to-teal-400">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Welcome to YourApp
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Discover the future of productivity with our innovative app.
          </p>
          <button className="mt-8 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section ref={featuresRef} className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-800">Features</h2>
        {/* Feature content */}
      </section>

      {/* Demo Video Section */}
      <section ref={demoRef} className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800">Watch Our Demo</h2>
          <div className="mt-8">
            <iframe
              className="w-full h-64 md:h-96 rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/your-video-id"
              title="Demo Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800">What Our Users Say</h2>
        {/* Testimonial content */}
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="bg-gradient-to-r from-teal-400 to-blue-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white">Get in Touch</h2>
          <button className="mt-8 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="container mx-auto px-6 py-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
