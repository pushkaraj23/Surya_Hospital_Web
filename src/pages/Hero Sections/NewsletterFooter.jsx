import React, { useState } from 'react';
import { Facebook, Instagram, Mail, MapPin } from 'lucide-react';

export default function NewsletterFooter() {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        if (email && email.includes('@')) {
            alert(`Subscribed with email: ${email}`);
            setEmail('');
        } else {
            alert('Please enter a valid email address');
        }
    };

    return (
        <div className="w-full bg-gradient-to-b from-blue-900 to-blue-950 text-white py-12 px-6">
            {/* Newsletter Subscription */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 rounded-3xl p-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Subscribe to our Newsletter
                        </h2>
                        <div className="flex gap-2 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-6 py-3 rounded-lg w-full md:w-80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSubscribe}
                                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Content */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Contact Information */}
                    <div className="space-y-3">
                        <p className="text-sm">
                            <span className="font-semibold">Address:</span> 123 Wellness Avenue, Healthy City, State 12345
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Phone:</span> (123) 456-7890
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Email:</span> info@hospitalnearj.org
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Fax:</span> (123) 456-7891
                        </p>
                        <div className="pt-4 space-y-2 border-t border-blue-700 mt-4">
                            <p className="text-sm font-semibold">Emergency Department: Open 24/7</p>
                            <p className="text-sm">Outpatient Clinics: Mon-Fri, 8:00 AM - 6:00 PM</p>
                            <p className="text-sm">Laboratory & Imaging: Mon-Sat. 7:00 AM - 5:00 PM</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">Home</a>
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">About Us</a>
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">Departments</a>
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">Doctors</a>
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">Gallery</a>
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">Blogs</a>
                        </div>
                        <div className="space-y-3">
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">Terms & Conditions</a>
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">Privacy Policy</a>
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">Accessibility</a>
                            <a href="#" className="block text-sm hover:text-orange-300 transition-colors">Non-Discrimination Notice</a>
                        </div>
                    </div>

                    {/* Social Media and Map */}
                    <div className="flex flex-row items-center md:items-end gap-4">
                        <div className="flex gap-4 mb-4">
                            <div className='p-3 bg-white'>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <Facebook className="w-5 h-5 bg-white text-blue-900 hover:text-blue-600" />
                                </a>
                            </div>
                            <div className='p-3 bg-white'>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="w-5 h-5 bg-white text-blue-900 hover:text-pink-600" />
                                </a>
                            </div>
                            <div className='p-3 rounded-full bg-white'>
                                <a href="mailto:someone@example.com">
                                    <Mail className="w-5 h-5 bg-white text-blue-900 hover:text-red-600" />
                                </a>
                            </div>
                        </div>

                        <div className="w-56 h-48 bg-gray-200 rounded-2xl overflow-hidden shadow-lg relative">
                            <img
                                src="https://api.placeholder.com/400/300"
                                alt="Map location"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
                                    SURYA HOSPITA
                                </div>
                            </div>
                            <MapPin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-red-600" />
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pt-6 border-t border-blue-700">
                    <p className="text-sm text-gray-300">©2025. All rights reserved</p>
                </div>
            </div>
        </div>
    );
}