import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CertificateSearchForm() {
  const [formData, setFormData] = useState({
    studentId: '',
    certificateCode: '',
    certificateType: '',
    issueDate: '',
    receiveDate: '',
    status: '',
    score: '',
    publishDate: ''
  });

  const certificateTypes = [
    'IELTS',
    'TOEFL',
    'TOEIC',
    'Cambridge',
    'PTE',
    'SAT',
    'ACT',
    'GRE',
    'GMAT'
  ];

  const statusOptions = [
    'DAGUI',
    'CHUAGUI',
    'DANHAN',
    'HIEULUC',
    'HETHAN'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    console.log('Tìm kiếm với dữ liệu:', formData);
    // Xử lý logic tìm kiếm ở đây
  };

  const handleSave = () => {
    console.log('Lưu dữ liệu:', formData);
    // Xử lý logic lưu ở đây
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <h1 className="text-xl font-bold text-blue-600 text-center mb-6">
          TRA CỨU THÔNG TIN CHỨNG CHỈ
        </h1>
        
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            name="studentId"
            placeholder="Nhập mã thí sinh"
            value={formData.studentId}
            onChange={handleInputChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Tìm kiếm
          </button>
        </div>

        <div className="border border-gray-300 rounded p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="text-blue-600 font-medium">Mã chứng chỉ:</label>
            <input
              type="text"
              name="certificateCode"
              placeholder="Mã của chứng chỉ"
              value={formData.certificateCode}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-blue-600 font-medium">Chứng chỉ:</label>
            <div className="relative">
              <select
                name="certificateType"
                value={formData.certificateType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {certificateTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-blue-600 font-medium">Ngày cấp:</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-blue-600 font-medium">Ngày nhận:</label>
            <input
              type="date"
              name="receiveDate"
              value={formData.receiveDate}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-blue-600 font-medium">Trạng thái:</label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-blue-600 font-medium">Điểm:</label>
            <input
              type="text"
              name="score"
              value={formData.score}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-blue-600 font-medium">Ngày công bố:</label>
            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}