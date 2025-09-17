"use client";

import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Users, ChevronDown } from 'lucide-react';

const CourseSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả danh mục');
  const [selectedInstructor, setSelectedInstructor] = useState('Tất cả giảng viên');
  const [priceRange, setPriceRange] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(true);

  const courses = [
    {
      id: 1,
      title: 'Lập trình Java cơ bản',
      instructor: 'Phạm Trần Minh Khuê',
      price: '900,000',
      priceValue: 900000,
      rating: 4.8,
      students: 1250,
      duration: '40 giờ',
      image: '/api/placeholder/300/200',
      category: 'Lập trình',
      level: 'Cơ bản'
    },
    {
      id: 2,
      title: 'React.js từ Zero đến Hero',
      instructor: 'Nguyễn Văn An',
      price: '1,200,000',
      priceValue: 1200000,
      rating: 4.9,
      students: 890,
      duration: '60 giờ',
      image: '/api/placeholder/300/200',
      category: 'Web Development',
      level: 'Trung cấp'
    },
    {
      id: 3,
      title: 'Python cho Data Science',
      instructor: 'Lê Thị Hoa',
      price: '1,500,000',
      priceValue: 1500000,
      rating: 4.7,
      students: 670,
      duration: '80 giờ',
      image: '/api/placeholder/300/200',
      category: 'Data Science',
      level: 'Nâng cao'
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      instructor: 'Trần Quốc Việt',
      price: '1,100,000',
      priceValue: 1100000,
      rating: 4.6,
      students: 540,
      duration: '50 giờ',
      image: '/api/placeholder/300/200',
      category: 'Backend',
      level: 'Trung cấp'
    },
    {
      id: 5,
      title: 'Angular Framework Nâng cao',
      instructor: 'Nguyễn Thị Mai',
      price: '800,000',
      priceValue: 800000,
      rating: 4.5,
      students: 320,
      duration: '35 giờ',
      image: '/api/placeholder/300/200',
      category: 'Web Development',
      level: 'Nâng cao'
    },
    {
      id: 6,
      title: 'Machine Learning cơ bản',
      instructor: 'Trần Văn Đức',
      price: '2,200,000',
      priceValue: 2200000,
      rating: 4.9,
      students: 750,
      duration: '100 giờ',
      image: '/api/placeholder/300/200',
      category: 'Data Science',
      level: 'Trung cấp'
    }
  ];

  const categories = ['Tất cả danh mục', 'Lập trình', 'Web Development', 'Data Science', 'Backend', 'Mobile'];
  const instructors = ['Tất cả giảng viên', 'Phạm Trần Minh Khuê', 'Nguyễn Văn An', 'Lê Thị Hoa', 'Trần Quốc Việt', 'Nguyễn Thị Mai', 'Trần Văn Đức'];
  const priceRanges = ['Tất cả', 'Dưới 1 triệu', '1-2 triệu', 'Trên 2 triệu'];

  const checkPriceRange = (price: number, range: any) => {
    switch (range) {
      case 'Dưới 1 triệu':
        return price < 1000000;
      case '1-2 triệu':
        return price >= 1000000 && price <= 2000000;
      case 'Trên 2 triệu':
        return price > 2000000;
      case 'Tất cả':
      default:
        return true;
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả danh mục' || course.category === selectedCategory;
    const matchesInstructor = selectedInstructor === 'Tất cả giảng viên' || course.instructor === selectedInstructor;
    const matchesPrice = checkPriceRange(course.priceValue, priceRange);
    
    return matchesSearch && matchesCategory && matchesInstructor && matchesPrice;
  });

  const resetFilters = () => {
    setSelectedCategory('Tất cả danh mục');
    setSelectedInstructor('Tất cả giảng viên');
    setPriceRange('Tất cả');
    setSearchTerm('');
  };

  const getCourseIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'Lập trình': '💻',
      'Web Development': '🌐',
      'Data Science': '📊',
      'Backend': '⚙️',
      'Mobile': '📱'
    };
    return icons[category] || '💻';
  };

  const getLevelColor = (level: string): string => {
    const colors: Record<string, string> = {
      'Cơ bản': 'bg-green-100 text-green-800',
      'Trung cấp': 'bg-blue-100 text-blue-800',
      'Nâng cao': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học, giảng viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Filter className="h-4 w-4" />
            <span className="font-medium">Bộ lọc tìm kiếm</span>
            <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Instructor Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giảng viên</label>
                <select
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  {instructors.map(instructor => (
                    <option key={instructor} value={instructor}>{instructor}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng giá</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-end space-y-2">
                <button 
                  onClick={resetFilters}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                >
                  <i className="fas fa-redo-alt mr-2"></i>
                  Đặt lại
                </button>
                <button className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                  <i className="fas fa-search mr-2"></i>
                  Áp dụng lọc
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== 'Tất cả danh mục' || selectedInstructor !== 'Tất cả giảng viên' || priceRange !== 'Tất cả' || searchTerm) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Bộ lọc đang áp dụng:</h4>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      Từ khóa: "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                    </span>
                  )}
                  {selectedCategory !== 'Tất cả danh mục' && (
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('Tất cả danh mục')} className="ml-2 text-green-600 hover:text-green-800">×</button>
                    </span>
                  )}
                  {selectedInstructor !== 'Tất cả giảng viên' && (
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {selectedInstructor}
                      <button onClick={() => setSelectedInstructor('Tất cả giảng viên')} className="ml-2 text-purple-600 hover:text-purple-800">×</button>
                    </span>
                  )}
                  {priceRange !== 'Tất cả' && (
                    <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {priceRange}
                      <button onClick={() => setPriceRange('Tất cả')} className="ml-2 text-yellow-600 hover:text-yellow-800">×</button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Hiển thị <span className="font-semibold text-blue-600">{filteredCourses.length}</span> khóa học
              {searchTerm && ` cho "${searchTerm}"`}
            </p>
            <div className="text-sm text-gray-500">
              Tổng cộng: {courses.length} khóa học
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
              {/* Course Image */}
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="text-white text-center relative z-10">
                  <div className="text-4xl mb-2">{getCourseIcon(course.category)}</div>
                  <h3 className="font-semibold text-sm px-4 line-clamp-2">{course.title}</h3>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {course.instructor}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                    <span className="text-sm text-gray-500">({course.students.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-blue-600">
                      {course.price}đ
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>

                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                  <i className="fas fa-eye mr-2"></i>
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy khóa học nào
            </h3>
            <p className="text-gray-600 mb-4">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn
            </p>
            <button 
              onClick={resetFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;