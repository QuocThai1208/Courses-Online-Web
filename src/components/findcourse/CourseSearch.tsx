"use client";

import React, { useEffect, useState } from 'react';
import { Search, Filter, Clock, Users, ChevronDown } from 'lucide-react';
import api, { endpoints } from '../../utils/api';
import Link from "next/link";

interface Course {
  id: number;
  subject: string;
  image: string;
  category: number;
  lecturer: number;
  name: string;
  description: string;
  price: string;
  level: string;
  duration: number;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
}

interface CoursesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
}

const CourseSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [totalCourses, setTotalCourses] = useState<number>(0);

  const loadCourses = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await api.get(endpoints["courses"]);
      console.log('Courses response:', res.data);
      
      const data = res.data as CoursesResponse;
      if (data && data.results) {
        setCourses(data.results);
        setTotalCourses(data.count);
      } else {
        setCourses([]);
        setTotalCourses(0);
      }
    } catch (error) {
      console.error("Failed to load courses", error);
      setCourses([]);
      setTotalCourses(0);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async (): Promise<void> => {
    try {
      const res = await api.get(endpoints["categories"]);
      console.log('Categories response:', res.data);
      
      if (res.data && Array.isArray(res.data)) {
        setCategories(res.data as Category[]);
      }
    } catch (error) {
      console.error("Failed to load categories", error);
      setCategories([]);
    }
  };

  const loadTeachers = async (): Promise<void> => {
    try {
      const res = await api.get(endpoints["teacher"]);
      console.log('Teachers response:', res.data);
      
      if (res.data && Array.isArray(res.data)) {
        setTeachers(res.data as Teacher[]);
      } else if (res.data && (res.data as any).results) {
        setTeachers((res.data as any).results as Teacher[]);
      }
    } catch (error) {
      console.error("Failed to load teachers", error);
      setTeachers([]);
    }
  };

  useEffect(() => {
    loadCourses();
    loadCategories();
    loadTeachers();
  }, []);

  const priceRanges = [
    { value: '', label: 'Tất cả' },
    { value: 'under_100k', label: 'Dưới 100,000đ' },
    { value: '100k_500k', label: '100,000đ - 500,000đ' },
    { value: '500k_1m', label: '500,000đ - 1,000,000đ' },
    { value: 'over_1m', label: 'Trên 1,000,000đ' }
  ];

  const levelLabels: Record<string, string> = {
    'so_cap': 'Sơ cấp',
    'trung_cap': 'Trung cấp', 
    'nang_cao': 'Nâng cao'
  };

  const checkPriceRange = (price: string, range: string): boolean => {
    const priceValue = parseFloat(price);
    
    switch (range) {
      case 'under_100k':
        return priceValue < 100000;
      case '100k_500k':
        return priceValue >= 100000 && priceValue <= 500000;
      case '500k_1m':
        return priceValue >= 500000 && priceValue <= 1000000;
      case 'over_1m':
        return priceValue > 1000000;
      case '':
      default:
        return true;
    }
  };

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Chưa phân loại';
  };

  const getTeacherName = (teacherId: number): string => {
    const teacher = teachers.find(t => t.id === teacherId);
     return teacher ? `${teacher.first_name} ${teacher.last_name}` : "Unknown";
  };

  const filteredCourses = courses.filter((course: Course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || course.category.toString() === selectedCategory;
    
    const matchesInstructor = !selectedInstructor || course.lecturer.toString() === selectedInstructor;
    
    const matchesPrice = checkPriceRange(course.price, priceRange);
    
    return matchesSearch && matchesCategory && matchesInstructor && matchesPrice;
  });

  const resetFilters = (): void => {
    setSelectedCategory('');
    setSelectedInstructor('');
    setPriceRange('');
    setSearchTerm('');
  };

  const getCourseIcon = (categoryId: number): string => {
    const icons: Record<number, string> = {
      1: '💻', 
      2: '⚙️', 
      3: '🔒', 
      4: '📊' 
    };
    return icons[categoryId] || '💻';
  };

  const getLevelColor = (level: string): string => {
    const colors: Record<string, string> = {
      'so_cap': 'bg-green-100 text-green-800',
      'trung_cap': 'bg-blue-100 text-blue-800',
      'nang_cao': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const formatPrice = (price: string): string => {
    return new Intl.NumberFormat('vi-VN').format(parseFloat(price));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải khóa học...</p>
        </div>
      </div>
    );
  }

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
                  <option value="">Tất cả danh mục</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id.toString()}>
                      {category.name}
                    </option>
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
                  <option value="">Tất cả giảng viên</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id.toString()}>
                      {teacher.first_name + teacher.last_name || `Giảng viên ${teacher.id}`}
                    </option>
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
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-end space-y-2">
                <button 
                  onClick={resetFilters}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                >
                  Đặt lại
                </button>
                <button className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                  Áp dụng lọc
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory || selectedInstructor || priceRange || searchTerm) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Bộ lọc đang áp dụng:</h4>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      Từ khóa: "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {getCategoryName(parseInt(selectedCategory))}
                      <button onClick={() => setSelectedCategory('')} className="ml-2 text-green-600 hover:text-green-800">×</button>
                    </span>
                  )}
                  {selectedInstructor && (
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {getTeacherName(parseInt(selectedInstructor))}
                      <button onClick={() => setSelectedInstructor('')} className="ml-2 text-purple-600 hover:text-purple-800">×</button>
                    </span>
                  )}
                  {priceRange && (
                    <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {priceRanges.find(r => r.value === priceRange)?.label}
                      <button onClick={() => setPriceRange('')} className="ml-2 text-yellow-600 hover:text-yellow-800">×</button>
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
              Tổng cộng: {totalCourses} khóa học
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
              {/* Course Image */}
              <div className="h-48 relative overflow-hidden">
                {course.image ? (
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">{getCourseIcon(course.category)}</div>
                      <h3 className="font-semibold text-sm px-4 line-clamp-2">{course.name}</h3>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>

              {/* Course Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {getCategoryName(course.category)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(course.level)}`}>
                    {levelLabels[course.level] || course.level}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
                  {course.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-2">
                  {course.subject}
                </p>

                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {getTeacherName(course.lecturer)}
                </p>

                <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{course.duration} giờ</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(course.created_at).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-blue-600">
                      {formatPrice(course.price)}đ
                    </span>
                  </div>
                </div>

                <Link
                  href={`/course/${course.id}`}
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && !loading && (
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