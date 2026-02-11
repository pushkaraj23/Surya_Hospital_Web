import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createContact } from "../../api/userApi"; // Import your API function

const ContactUs = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const request = searchParams.get("request");
        if (request === "brochure") {
            setFormData(prev => ({
                ...prev,
                subject: "Medical Tourism Brochure Request",
                message: "I would like to receive the Medical Tourism brochure for Surya Hospital. Please send it to my email.",
            }));
        }
    }, [searchParams]);

    useEffect(() => {
        // Simulate API loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);
            
            try {
                // Prepare data for API - matching your exact body structure
                const contactData = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message
                };

                // Call the imported API function
                const result = await createContact(contactData);
                
                console.log("Contact form submitted successfully:", result);
                alert("Thank you for your message! We'll get back to you soon.");

                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("There was an error submitting your message. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-gray-800 font-primary">
                <div className="bg-white/20 backdrop-blur-md rounded-full h-16 w-16 border-4 border-t-transparent border-gray-800 animate-spin mb-4"></div>
                <p className="text-lg font-secondary opacity-90 animate-pulse">
                    Loading Contact Information...
                </p>
            </div>
        );
    }

    return (
        <div className="font-primary min-h-screen text-gray-800 relative overflow-hidden animate-fadeIn mt-20 py-10">
            <div className="relative z-10 space-y-8 max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="w-full bg-gradient-to-r from-primary via-secondary to-accent px-6 py-4 rounded-xl shadow-xl backdrop-blur-md bg-opacity-80 text-center">
                    <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                        Contact Us
                    </h1>
                    <p className="text-lg opacity-90  text-white font-secondary">
                        Get in touch with Surya Hospital - We're here to help
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Hospital Contact Info */}
                        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Hospital Information
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-accent mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold">Address</h3>
                                        <p className="text-sm opacity-90">
                                            123 Medical Center Drive<br />
                                            Healthcare District<br />
                                            Mumbai, Maharashtra 400001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <p className="text-sm opacity-90">+91 8888-6890-61</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p className="text-sm opacity-90">contact@fibonce.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold">Fax</h3>
                                        <p className="text-sm opacity-90">+91 22-1234-5678</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold">Website</h3>
                                        <p className="text-sm opacity-90">https://www.fibonce.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg border ">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Working Hours
                            </h2>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span className="font-semibold">8:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-semibold">9:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-gray-800">
                                    <span className="text-red-300 font-semibold">Emergency</span>
                                    <span className="text-red-300 font-semibold">24×7</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contacts */}
                        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg border ">
                            <h2 className="text-xl font-bold mb-4">Quick Connect</h2>
                            <div className="space-y-3">
                                <button className="w-full bg-gradient-to-r from-accent to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-left flex items-center gap-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Send Email
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form & Map */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Form */}
                        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg border ">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                Send us a Message
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${errors.name ? 'border-red-400' : 'border-gray-400'
                                                }`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && (
                                            <p className="text-red-300 text-sm">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${errors.email ? 'border-red-400' : 'border-gray-400'
                                                }`}
                                            placeholder="Enter your email address"
                                        />
                                        {errors.email && (
                                            <p className="text-red-300 text-sm">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${errors.phone ? 'border-red-400' : 'border-gray-400'
                                                }`}
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-300 text-sm">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Subject */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${errors.subject ? 'border-red-400' : 'border-gray-400'
                                                }`}
                                            placeholder="Enter message subject"
                                        />
                                        {errors.subject && (
                                            <p className="text-red-300 text-sm">{errors.subject}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none ${errors.message ? 'border-red-400' : 'border-gray-800'
                                            }`}
                                        placeholder="Please describe your inquiry or message in detail..."
                                    />
                                    {errors.message && (
                                        <p className="text-red-300 text-sm">{errors.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-primary to-secondary  text-white  py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-md border border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                                Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Google Map */}
                        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg border ">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Find Us
                            </h2>
                            
                            <div className="bg-gray-800 rounded-lg overflow-hidden h-64 md:h-80 relative">
                                {/* Mock Google Map - Replace with actual Google Maps embed */}
                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <svg className="w-12 h-12 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="font-semibold">Surya Hospital Location</p>
                                        <p className="text-sm opacity-80 mt-1">123 Medical Center Drive, Mumbai</p>
                                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                            Open in Google Maps
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;