"use client";

import { useState, useRef, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'teacher' | 'student';
  time: string;
  avatar: string;
  isFile?: boolean;
}

type UserType = 'teacher' | 'student';

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Chào em! Hôm nay chúng ta sẽ học về React Components nhé.",
      sender: 'teacher',
      time: '14:30',
      avatar: '👨‍🏫',
      isFile: false
    },
    {
      id: 2,
      text: "Dạ em chào thầy! Em đã chuẩn bị bài trước rồi ạ.",
      sender: 'student',
      time: '14:32',
      avatar: '👨‍🎓',
      isFile: false
    },
    {
      id: 3,
      text: "Rất tốt! Em có thể cho thầy biết useState hook được sử dụng để làm gì không?",
      sender: 'teacher',
      time: '14:33',
      avatar: '👨‍🏫',
      isFile: false
    }
  ]);

  const [newMessage, setNewMessage] = useState<string>('');
  const [userType, setUserType] = useState<UserType>('student');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: userType,
        time: new Date().toLocaleTimeString('vi-VN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        avatar: userType === 'teacher' ? '👨‍🏫' : '👨‍🎓',
        isFile: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const message: Message = {
        id: messages.length + 1,
        text: `📎 Đã gửi file: ${file.name}`,
        sender: userType,
        time: new Date().toLocaleTimeString('vi-VN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        avatar: userType === 'teacher' ? '👨‍🏫' : '👨‍🎓',
        isFile: true
      };
      setMessages([...messages, message]);
    }
  };

  const handleQuickMessage = (message: string): void => {
    setNewMessage(message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Chat Room</h1>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'teacher' ? 'justify-start' : 'justify-end'
              }`}
            >
              {message.sender === 'teacher' && (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg flex-shrink-0">
                  {message.avatar}
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.sender === 'teacher'
                    ? 'bg-white border border-gray-200 text-gray-800'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                }`}
              >
                <div className={`font-medium text-sm mb-1 ${
                  message.sender === 'teacher' ? 'text-blue-600' : 'text-blue-100'
                }`}>
                  {message.sender === 'teacher' ? 'Giảng viên' : 'Sinh viên'}
                </div>
                <div className={`${message.isFile ? 'font-medium' : ''}`}>
                  {message.text}
                </div>
                <div className={`text-xs mt-2 ${
                  message.sender === 'teacher' ? 'text-gray-500' : 'text-blue-100'
                }`}>
                  {message.time}
                </div>
              </div>

              {message.sender === 'student' && (
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg flex-shrink-0">
                  {message.avatar}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
            
            {/* File Upload */}
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.jpg,.png,.gif"
              />
              <div className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <span className="text-xl">📎</span>
              </div>
            </label>

            {/* Message Input */}
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
                placeholder={`Nhập tin nhắn với vai trò ${userType === 'teacher' ? 'Giảng viên' : 'Sinh viên'}...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span className="text-xl">🚀</span>
            </button>
          </form>

          {/* Quick Actions */}
          <div className="mt-4 flex gap-2 flex-wrap">
            {userType === 'teacher' ? (
              <>
                <button 
                  onClick={() => handleQuickMessage('Hôm nay chúng ta sẽ học về...')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                >
                  📚 Bắt đầu bài học
                </button>
                <button 
                  onClick={() => handleQuickMessage('Các em có câu hỏi gì không?')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
                >
                  ❓ Hỏi đáp
                </button>
                <button 
                  onClick={() => handleQuickMessage('Bài tập về nhà là...')}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                >
                  📝 Giao bài tập
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleQuickMessage('Em có một câu hỏi ạ!')}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors"
                >
                  🙋‍♂️ Đặt câu hỏi
                </button>
                <button 
                  onClick={() => handleQuickMessage('Em đã hiểu rồi ạ, cảm ơn thầy!')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
                >
                  ✅ Đã hiểu
                </button>
                <button 
                  onClick={() => handleQuickMessage('Em nộp bài tập ạ!')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                >
                  📤 Nộp bài
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;