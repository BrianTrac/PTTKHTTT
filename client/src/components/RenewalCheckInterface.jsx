import React, { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';

export default function RenewalCheckInterface() {
  const [requestCode, setRequestCode] = useState('');
  const [projectInfo, setProjectInfo] = useState({
    code: '',
    price: '',
    extensions: '',
    requestDate: '',
    reason: ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedFile({
            name: file.name,
            preview: e.target.result
          });
        };
        reader.readAsDataURL(file);
      } else {
        alert('Vui lòng chọn file ảnh!');
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleConfirm = () => {
    if (!uploadedFile) {
      alert('Vui lòng upload bằng chứng!');
      return;
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSearch = () => {
    if (!requestCode.trim()) {
      alert('Vui lòng nhập mã yêu cầu!');
      return;
    }
    // Simulate search - in real app, this would call an API
    console.log('Searching for:', requestCode);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>Xác nhận thành công!</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="border-2 border-gray-800 rounded-lg p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-8">
          KIỂM TRA ĐIỀU KIỆN GIA HẠN
        </h1>

        {/* Search Section */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Nhập mã yêu cầu"
            value={requestCode}
            onChange={(e) => setRequestCode(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          />
          <button 
            onClick={handleSearch}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Project Information */}
        <div className="border-2 border-gray-800 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            {/* Project Code */}
            <div className="flex items-center">
              <label className="w-40 text-blue-600 font-semibold">
                Mã phiếu dự thí:
              </label>
              <input
                type="text"
                value={projectInfo.code}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
            </div>

            {/* Price */}
            <div className="flex items-center">
              <label className="w-40 text-blue-600 font-semibold">
                Phí gia hạn:
              </label>
              <input
                type="text"
                value={projectInfo.price}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
            </div>

            {/* Extension Count */}
            <div className="flex items-center">
              <label className="w-40 text-blue-600 font-semibold">
                Số lần đã gia hạn:
              </label>
              <input
                type="text"
                value={projectInfo.extensions}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
            </div>

            {/* Request Date */}
            <div className="flex items-center">
              <label className="w-40 text-blue-600 font-semibold">
                Ngày yêu cầu:
              </label>
              <input
                type="text"
                value={projectInfo.requestDate}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
            </div>

            {/* Reason */}
            <div className="flex items-center">
              <label className="w-40 text-blue-600 font-semibold">
                Lý do:
              </label>
              <input
                type="text"
                value={projectInfo.reason}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
            </div>

            {/* Evidence Upload */}
            <div className="flex items-start">
              <label className="w-40 text-blue-600 font-semibold pt-2">
                Bằng chứng:
              </label>
              <div className="flex-1">
                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Click để tải lên hình ảnh</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      Chọn file
                    </label>
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {uploadedFile.name}
                      </span>
                      <button
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                      <img
                        src={uploadedFile.preview}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleConfirm}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}