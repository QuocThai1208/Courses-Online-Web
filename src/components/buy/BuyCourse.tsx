"use client";

import React, { useState } from 'react';

// Types definition
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: 'MOMO' | 'QR';
  note?: string;
}

interface CourseFeature {
  id: number;
  text: string;
}

interface CourseBenefit {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// Component
const BuyCourse: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: 'MOMO',
    note: ''
  });

  const [showQR, setShowQR] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Course data
  const coursePrice: number = 1499000;
  const courseTitle: string = "Web Development MasterClass";

  const courseFeatures: CourseFeature[] = [
    { id: 1, text: "50 giờ học chất lượng cao" },
    { id: 2, text: "Dự án thực tế với mentor" },
    { id: 3, text: "Hỗ trợ 24/7 từ giảng viên" },
    { id: 4, text: "Cập nhật nội dung liên tục" },
    { id: 5, text: "Cộng đồng học viên đông đức" }
  ];

  const courseBenefits: CourseBenefit[] = [
    {
      id: 1,
      icon: "🎯",
      title: "Thực hành 100%",
      description: "Học qua dự án thực tế, không chỉ lý thuyết suông"
    },
    {
      id: 2,
      icon: "👨‍💻",
      title: "Mentor 1-1",
      description: "Được hướng dẫn trực tiếp từ senior developer"
    },
    {
      id: 3,
      icon: "📜",
      title: "Chứng chỉ",
      description: "Nhận chứng chỉ hoàn thành được công nhận"
    }
  ];

  // Event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handlePaymentMethod = (method: 'MOMO' | 'QR'): void => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
    setShowQR(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong 24h.');
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        paymentMethod: 'MOMO',
        note: ''
      });
      setShowQR(false);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left Column - Course Information */}
          <div className="space-y-6">
            <div className="border border-gray-300 p-8 rounded-lg h-fit">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
                {courseTitle.split(' ').map((word, index) => (
                  <React.Fragment key={index}>
                    {word}
                    {index === 1 && <br />}
                    {index !== 1 && index !== courseTitle.split(' ').length - 1 && ' '}
                  </React.Fragment>
                ))}
              </h1>
              
              <ul className="space-y-3 text-gray-700 mb-8">
                {courseFeatures.map((feature) => (
                  <li key={feature.id} className="flex items-start">
                    <span className="text-gray-500 mr-3 mt-1">-</span>
                    <span className="leading-relaxed">{feature.text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="text-4xl font-bold text-gray-800">
                {formatPrice(coursePrice)}
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Ưu đãi đặc biệt:</strong> Giảm 20% cho 100 học viên đầu tiên!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="space-y-6">
            <div className="border border-gray-300 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Đăng ký ngay
              </h2>
              
              <div className="space-y-4">
                {/* Full Name Input */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Họ và tên *"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                      errors.fullName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>
                
                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                {/* Phone Input */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                
                {/* Note Textarea */}
                <div>
                  <textarea
                    name="note"
                    placeholder="Ghi chú (tùy chọn)"
                    value={formData.note}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </div>
                
                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Phương thức thanh toán *
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => handlePaymentMethod('MOMO')}
                      disabled={isLoading}
                      className={`flex-1 py-4 px-4 border-2 rounded-md font-semibold transition-all duration-200 ${
                        formData.paymentMethod === 'MOMO'
                          ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md'
                          : 'border-gray-300 hover:border-pink-300 hover:shadow-sm'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">📱</div>
                        <div>MOMO</div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handlePaymentMethod('QR')}
                      disabled={isLoading}
                      className={`flex-1 py-4 px-4 border-2 rounded-md font-semibold transition-all duration-200 ${
                        formData.paymentMethod === 'QR'
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-300 hover:border-blue-300 hover:shadow-sm'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">🔗</div>
                        <div>Mã QR</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* QR Code Display */}
                {showQR && (
                  <div className="mt-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border text-center">
                    <div className="w-32 h-32 bg-white mx-auto mb-4 rounded-lg shadow-inner flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📱</div>
                        <div className="text-xs text-gray-500">QR Code</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-800">
                        Quét mã QR để thanh toán
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        Số tiền: {formatPrice(coursePrice)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Phương thức: {formData.paymentMethod}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-4 px-4 rounded-md font-semibold transition-all duration-200 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gray-800 hover:bg-gray-700 active:bg-gray-900'
                  } text-white shadow-md hover:shadow-lg`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    'Đăng ký ngay'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  * Các trường bắt buộc
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Course Benefits Section */}
      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Tại sao chọn khóa học của chúng tôi?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseBenefits.map((benefit) => (
            <div 
              key={benefit.id}
              className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow duration-200 bg-gradient-to-b from-white to-gray-50"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h4 className="text-lg font-semibold mb-3 text-gray-800">
                {benefit.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-yellow-800 mb-2">
              🎓 Cam kết chất lượng
            </h4>
            <p className="text-yellow-700 text-sm">
              Hoàn tiền 100% nếu bạn không hài lòng sau 7 ngày đầu tiên
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCourse;