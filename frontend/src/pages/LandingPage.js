import React from 'react';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-gray-900 text-white h-96 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to Salon Booking</h1>
          <p className="mt-4">Book your appointments with ease and style</p>
          <a href="/booking" className="mt-6 inline-block bg-pink-600 text-white px-6 py-2 rounded-full">Book Now</a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services py-16 bg-gray-100 text-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="service-item p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Haircut</h3>
              <p>Get the best haircut from our professional stylists.</p>
            </div>
            <div className="service-item p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Manicure</h3>
              <p>Pamper yourself with a refreshing manicure session.</p>
            </div>
            <div className="service-item p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Hair Coloring</h3>
              <p>Transform your look with our expert hair coloring services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-16 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="testimonial-item p-6 bg-gray-700 rounded-lg">
              <p>"The best salon experience I've ever had!"</p>
              <p>- Jane Doe</p>
            </div>
            <div className="testimonial-item p-6 bg-gray-700 rounded-lg">
              <p>"Professional, friendly, and my hair looks amazing!"</p>
              <p>- John Smith</p>
            </div>
            <div className="testimonial-item p-6 bg-gray-700 rounded-lg">
              <p>"Highly recommend their services, will definitely come back."</p>
              <p>- Sarah Lee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
