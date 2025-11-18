// BlogPage.jsx
import React, { useState, useEffect } from 'react';

/* ----------------------------------------------------------
   MAIN BLOG COMPONENT
---------------------------------------------------------- */
const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'

  // Sample blog data
  useEffect(() => {
    const sampleArticles = [
      {
        id: 1,
        title: "10 Essential Health Tips for a Better Lifestyle",
        slug: "10-essential-health-tips-for-better-lifestyle",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "Lifestyle",
        content: `
          <h2>Introduction to Healthy Living</h2>
          <p>Living a healthy lifestyle is crucial for maintaining overall well-being and preventing chronic diseases. Here are 10 essential tips that can transform your health journey.</p>
          
          <h3>1. Balanced Nutrition</h3>
          <p>Focus on consuming a variety of fruits, vegetables, whole grains, and lean proteins. Avoid processed foods and excessive sugar intake. A balanced diet provides essential nutrients that support immune function and energy levels.</p>
          
          <h3>2. Regular Exercise</h3>
          <p>Aim for at least 30 minutes of moderate exercise daily. This can include walking, swimming, or cycling. Regular physical activity improves cardiovascular health, strengthens bones and muscles, and enhances mental well-being.</p>
          
          <h3>3. Quality Sleep</h3>
          <p>Get 7-9 hours of quality sleep each night to allow your body to repair and rejuvenate. Proper sleep is essential for cognitive function, mood regulation, and overall health maintenance.</p>
          
          <h3>4. Stress Management</h3>
          <p>Practice meditation, deep breathing, or yoga to manage stress effectively. Chronic stress can lead to various health issues, so finding healthy coping mechanisms is crucial.</p>
          
          <h3>5. Hydration</h3>
          <p>Drink at least 8 glasses of water daily to maintain proper bodily functions. Proper hydration supports digestion, nutrient absorption, and temperature regulation.</p>
        `,
        excerpt: "Discover 10 practical health tips that can significantly improve your quality of life and overall well-being.",
        author: "Dr. Sarah Johnson",
        createdat: "2025-11-15T18:30:00.000Z",
        updatedat: null,
        isactive: true,
        readTime: "5 min read"
      },
      {
        id: 2,
        title: "Understanding Heart Disease: Prevention and Management",
        slug: "understanding-heart-disease-prevention-management",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "Cardiology",
        content: `
          <h2>Heart Disease Overview</h2>
          <p>Heart disease remains the leading cause of death worldwide. Understanding risk factors and prevention strategies is crucial for maintaining cardiovascular health.</p>
          
          <h3>Risk Factors</h3>
          <ul>
            <li><strong>High blood pressure:</strong> Regular monitoring and management are essential</li>
            <li><strong>High cholesterol:</strong> Diet and medication can help control levels</li>
            <li><strong>Smoking:</strong> Quitting significantly reduces heart disease risk</li>
            <li><strong>Diabetes:</strong> Proper management is key to heart health</li>
            <li><strong>Family history:</strong> Regular screenings are important for those with genetic predisposition</li>
          </ul>
          
          <h3>Prevention Strategies</h3>
          <p>Regular check-ups, healthy diet, exercise, and stress management can significantly reduce heart disease risk. Early detection through routine screenings can save lives.</p>
          
          <h3>Symptoms to Watch For</h3>
          <p>Chest pain, shortness of breath, and fatigue should never be ignored. Seek immediate medical attention if you experience these symptoms.</p>
        `,
        excerpt: "Learn about heart disease risk factors, prevention strategies, and early warning signs everyone should know.",
        author: "Dr. Michael Chen",
        createdat: "2025-11-14T18:30:00.000Z",
        updatedat: null,
        isactive: true,
        readTime: "8 min read"
      },
      {
        id: 3,
        title: "Mental Health Awareness: Breaking the Stigma",
        slug: "mental-health-awareness-breaking-stigma",
        image: "https://images.unsplash.com/photo-1590608897129-79da98d15969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "Mental Health",
        content: `
          <h2>The Importance of Mental Health</h2>
          <p>Mental health is just as important as physical health, yet it often carries unnecessary stigma that prevents people from seeking help.</p>
          
          <h3>Common Mental Health Conditions</h3>
          <p>Depression, anxiety, and stress-related disorders affect millions worldwide. Understanding these conditions is the first step toward effective management and recovery.</p>
          
          <h3>Breaking the Stigma</h3>
          <p>Open conversations, education, and support systems are key to eliminating mental health stigma. Creating safe spaces for discussion encourages people to seek help without fear of judgment.</p>
          
          <h3>Seeking Help</h3>
          <p>Professional help, therapy, and medication can effectively manage mental health conditions. Early intervention leads to better outcomes and improved quality of life.</p>
        `,
        excerpt: "Join the conversation about mental health awareness and learn how to support those struggling with mental health issues.",
        author: "Dr. Emily Rodriguez",
        createdat: "2025-11-13T18:30:00.000Z",
        updatedat: null,
        isactive: true,
        readTime: "6 min read"
      },
      {
        id: 4,
        title: "Nutrition Guide for Children: Building Healthy Habits",
        slug: "nutrition-guide-children-building-healthy-habits",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
        category: "Pediatrics",
        content: `
          <h2>Child Nutrition Essentials</h2>
          <p>Proper nutrition during childhood sets the foundation for lifelong health and well-being. Establishing healthy eating patterns early can prevent future health issues.</p>
          
          <h3>Essential Nutrients</h3>
          <p>Children need balanced amounts of proteins, carbohydrates, healthy fats, vitamins, and minerals for proper growth and development. Each nutrient plays a specific role in supporting different aspects of health.</p>
          
          <h3>Healthy Eating Habits</h3>
          <p>Establish regular meal times, involve children in food preparation, and lead by example. Making mealtime enjoyable and educational encourages children to develop positive relationships with food.</p>
          
          <h3>Foods to Limit</h3>
          <p>Reduce processed foods, sugary drinks, and excessive snacks for better health outcomes. Focus on whole, nutrient-dense foods that support growth and development.</p>
        `,
        excerpt: "Discover practical tips for establishing healthy eating habits in children that will last a lifetime.",
        author: "Dr. James Wilson",
        createdat: "2025-11-12T18:30:00.000Z",
        updatedat: null,
        isactive: true,
        readTime: "7 min read"
      },
      {
        id: 5,
        title: "Exercise Benefits: More Than Just Weight Loss",
        slug: "exercise-benefits-more-than-just-weight-loss",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "Fitness",
        content: `
          <h2>Beyond Weight Management</h2>
          <p>Regular exercise offers numerous benefits beyond weight control that impact overall health and quality of life.</p>
          
          <h3>Mental Health Benefits</h3>
          <p>Exercise releases endorphins, reduces stress, and improves sleep quality. Physical activity has been shown to be as effective as medication for mild to moderate depression and anxiety.</p>
          
          <h3>Cardiovascular Health</h3>
          <p>Strengthens heart muscle, improves circulation, and reduces heart disease risk. Regular exercise helps maintain healthy blood pressure and cholesterol levels.</p>
          
          <h3>Bone and Muscle Strength</h3>
          <p>Weight-bearing exercises improve bone density and prevent osteoporosis. Strength training maintains muscle mass, which is crucial for metabolism and mobility as we age.</p>
        `,
        excerpt: "Explore the comprehensive benefits of regular exercise that go far beyond weight management.",
        author: "Dr. Robert Brown",
        createdat: "2025-11-11T18:30:00.000Z",
        updatedat: null,
        isactive: true,
        readTime: "5 min read"
      },
      {
        id: 6,
        title: "Sleep Science: Why Quality Sleep Matters",
        slug: "sleep-science-why-quality-sleep-matters",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
        category: "Wellness",
        content: `
          <h2>The Science of Sleep</h2>
          <p>Quality sleep is essential for physical repair, memory consolidation, and emotional regulation. Understanding sleep science helps optimize rest and recovery.</p>
          
          <h3>Sleep Cycles</h3>
          <p>Understanding REM and non-REM sleep cycles helps optimize sleep quality. Each cycle plays a different role in physical and mental restoration.</p>
          
          <h3>Health Impacts</h3>
          <p>Poor sleep affects immune function, cognitive performance, and metabolic health. Chronic sleep deprivation increases the risk of numerous health conditions.</p>
          
          <h3>Sleep Hygiene Tips</h3>
          <p>Create a consistent sleep schedule, optimize bedroom environment, and limit screen time before bed. These practices significantly improve sleep quality and duration.</p>
        `,
        excerpt: "Learn about the science behind sleep and discover practical tips for improving your sleep quality.",
        author: "Dr. Lisa Anderson",
        createdat: "2025-11-10T18:30:00.000Z",
        updatedat: null,
        isactive: true,
        readTime: "6 min read"
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setArticles(sampleArticles);
      setFilteredArticles(sampleArticles);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter articles by category and search
  useEffect(() => {
    let result = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(result);
  }, [selectedCategory, searchTerm, articles]);

  // Handle article selection
  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
    setViewMode('detail');
    // Scroll to top when opening article
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle back to list
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedArticle(null);
  };

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'Lifestyle', name: 'Lifestyle' },
    { id: 'Cardiology', name: 'Cardiology' },
    { id: 'Mental Health', name: 'Mental Health' },
    { id: 'Pediatrics', name: 'Pediatrics' },
    { id: 'Fitness', name: 'Fitness' },
    { id: 'Wellness', name: 'Wellness' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  // Render Article Detail View
  if (viewMode === 'detail' && selectedArticle) {
    return (
      <ArticleDetail 
        article={selectedArticle} 
        onBack={handleBackToList}
        relatedArticles={articles.filter(a => 
          a.id !== selectedArticle.id && 
          a.category === selectedArticle.category
        ).slice(0, 3)}
      />
    );
  }

  // Render Article List View
  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Health & Wellness Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights, health tips, and the latest medical information to help you live your healthiest life.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredArticles.length}</span> articles
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onSelect={handleArticleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------
   ARTICLE CARD COMPONENT
---------------------------------------------------------- */
const ArticleCard = ({ article, onSelect }) => {
  const safeArticle = article || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
      {/* Article Image */}
      <div 
        className="relative overflow-hidden"
        onClick={() => onSelect(safeArticle)}
      >
        <img
          src={safeArticle.image}
          alt={safeArticle.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {safeArticle.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{formatDate(safeArticle.createdat)}</span>
          <span className="mx-2">•</span>
          <span>{safeArticle.readTime || '5 min read'}</span>
        </div>

        <h2 
          className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
          onClick={() => onSelect(safeArticle)}
        >
          {safeArticle.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {safeArticle.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 text-sm font-semibold">
                {safeArticle.author?.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {safeArticle.author}
            </span>
          </div>

          <button
            onClick={() => onSelect(safeArticle)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Read More
          </button>
        </div>
      </div>
    </article>
  );
};

/* ----------------------------------------------------------
   ARTICLE DETAIL COMPONENT
---------------------------------------------------------- */
const ArticleDetail = ({ article, onBack, relatedArticles }) => {
  const safeArticle = article || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Articles
          </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Featured Image */}
          <div className="relative">
            <img
              src={safeArticle.image}
              alt={safeArticle.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {safeArticle.category}
              </span>
            </div>
          </div>

          {/* Article Header */}
          <div className="p-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>{formatDate(safeArticle.createdat)}</span>
              <span className="mx-2">•</span>
              <span>{safeArticle.readTime || '5 min read'}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {safeArticle.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-semibold">
                  {safeArticle.author?.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{safeArticle.author}</p>
                <p className="text-sm text-gray-600">Healthcare Professional</p>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-headings:mt-8 prose-headings:mb-4 prose-p:mb-4 prose-ul:mb-4 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: safeArticle.content }}
            />
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(relatedArticle => (
                <div 
                  key={relatedArticle.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    // You can implement navigation to this article here
                    // For now, it will just scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <div className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                      Read Article →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with Health Insights</h2>
            <p className="mb-6 opacity-90">Subscribe to our newsletter for the latest health tips and medical insights.</p>
            <div className="flex max-w-md  max-sm:flex-col max-sm:gap-2 mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg max-sm:rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white  max-sm:rounded-lg text-blue-600 font-semibold rounded-r-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;