import { useState } from 'react';
import { 
  FiStar, 
  FiMessageSquare, 
  FiUser, 
  FiMail, 
  FiSend,
  FiHeart,
  FiSmile,
  FiFrown,
  FiMeh
} from 'react-icons/fi';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    category: '',
    message: '',
    anonymous: false
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    'General Feedback',
    'Doctor Experience',
    'Facility & Cleanliness',
    'Staff Behavior',
    'Appointment Process',
    'Treatment Quality',
    'Waiting Time',
    'Billing Process'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const getRatingEmoji = (rating) => {
    if (rating >= 4) return <FiSmile className="text-green-500 text-xl" />;
    if (rating >= 3) return <FiMeh className="text-yellow-500 text-xl" />;
    return <FiFrown className="text-red-500 text-xl" />;
  };

  const getRatingText = (rating) => {
    const ratings = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return ratings[rating] || 'Select Rating';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Feedback submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        rating: 0,
        category: '',
        message: '',
        anonymous: false
      });
      setIsSubmitted(false);
    }, 3000);
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent service! Dr. Sharma was very patient and explained everything in detail. The staff was very cooperative.',
      category: 'Doctor Experience',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Priya Singh',
      rating: 4,
      comment: 'Clean facilities and professional staff. Waiting time was a bit long but overall good experience.',
      category: 'Facility & Cleanliness',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Amit Patel',
      rating: 5,
      comment: 'Best hospital in the city! The billing process was transparent and the treatment was effective.',
      category: 'Treatment Quality',
      date: '3 days ago'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiHeart className="text-green-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thank You for Your Feedback!
          </h2>
          <p className="text-gray-600 mb-6">
            Your feedback helps us improve our services and provide better care to our patients.
          </p>
          <div className="animate-pulse text-sm text-gray-500">
            We appreciate your time and valuable input
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <FiMessageSquare className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Share Your Experience
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve our services and provide better healthcare experiences for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Rating Section */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    How would you rate your experience?
                  </h3>
                  
                  {/* Star Rating */}
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transform hover:scale-110 transition-transform duration-200"
                      >
                        <FiStar
                          className={`text-3xl ${
                            star <= (hoverRating || formData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  
                  {/* Rating Feedback */}
                  <div className="flex items-center justify-center space-x-2">
                    {formData.rating > 0 && getRatingEmoji(formData.rating)}
                    <span className={`text-lg font-semibold ${
                      formData.rating >= 4 ? 'text-green-600' :
                      formData.rating >= 3 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {getRatingText(formData.rating)}
                    </span>
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiUser className="inline mr-2" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiMail className="inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    Submit feedback anonymously
                  </label>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Tell us about your experience... What did you like? What can we improve?"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formData.rating === 0 || isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="text-xl" />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Testimonials Sidebar */}
          <div className="space-y-6">
            {/* Overall Rating Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Overall Rating
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">4.8</div>
                <div className="flex justify-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className="text-yellow-400 fill-current text-lg"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Based on 1,247 reviews</p>
              </div>
            </div>

            {/* Recent Testimonials */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                What Our Patients Say
              </h3>
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`text-sm ${
                                i < testimonial.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{testimonial.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{testimonial.comment}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">
                        {testimonial.name}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {testimonial.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Feedback Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Response Rate</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Response Time</span>
                  <span className="font-semibold">2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Improvements Made</span>
                  <span className="font-semibold">47+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSend className="text-green-600 text-xl" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Quick Response</h4>
            <p className="text-gray-600 text-sm">
              We read every feedback and respond within 24 hours
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHeart className="text-blue-600 text-xl" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Make a Difference</h4>
            <p className="text-gray-600 text-sm">
              Your feedback directly impacts our service improvements
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageSquare className="text-purple-600 text-xl" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Anonymous Option</h4>
            <p className="text-gray-600 text-sm">
              Share your thoughts comfortably with anonymous submission
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;