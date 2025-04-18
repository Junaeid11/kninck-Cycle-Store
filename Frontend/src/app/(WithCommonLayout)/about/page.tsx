"use client";

import Link from "next/link";
import Image from "next/image";
import {  Bike, Truck, Users } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center bg-[url('https://www.shutterstock.com/image-photo/unrecognizable-silhouette-man-riding-bicycle-600nw-2089758175.jpg')]">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative text-white text-5xl md:text-6xl font-bold">About Us</h1>
      </section>

      {/* About Content */}
      <section className="container mx-auto px-6 md:px-12 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Who We Are</h2>
        <p className="mt-4 text-gray-600 text-lg md:w-3/4 mx-auto">
          At Krinck Store, we are passionate about bringing premium bicycles and accessories to cycling enthusiasts of all levels. Whether you&rsquo;re a city commuter or a trail conqueror, we&rsquo;ve got the perfect ride for you.
        </p>
        <div className="mt-8 flex justify-center">
          <Image
            src="https://www.shutterstock.com/image-photo/sporty-company-friends-on-bicycles-600nw-1918683059.jpg"
            alt="Cycling Gear"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-gray-600 text-lg">
            Our goal is to empower your cycling journey. From stylish city bikes to rugged mountain machines, we provide top-quality gear, expert advice, and stellar customer service to help you ride with confidence and joy.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 md:px-12 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">What We Offer</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
            <Bike className="w-12 h-12 text-green-600" />
            <h3 className="mt-4 text-xl font-bold text-gray-700">Wide Range of Bicycles</h3>
            <p className="mt-2 text-gray-600 text-center">From mountain bikes to road racers and everything in between.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
            <Users className="w-12 h-12 text-purple-500" />
            <h3 className="mt-4 text-xl font-bold text-gray-700">Expert Support</h3>
            <p className="mt-2 text-gray-600 text-center">Our knowledgeable team is here to help you find your perfect fit.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
            <Truck className="w-12 h-12 text-blue-600" />
            <h3 className="mt-4 text-xl font-bold text-gray-700">Fast Delivery</h3>
            <p className="mt-2 text-gray-600 text-center">Get your gear delivered quickly and safely to your doorstep.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-[#7B2CBF] text-white py-16 text-center">
        <h2 className="text-3xl font-bold">Ready to Ride?</h2>
        <p className="mt-4 text-lg">Browse our collection and find your perfect cycle today!</p>
        <Link
          href="/find-products"
          className="mt-6 inline-block bg-white text-[#7B2CBF] font-bold py-3 px-6 rounded-full transition-all hover:bg-gray-200"
        >
          Explore Bikes
        </Link>
      </section>
    </div>
  );
}
