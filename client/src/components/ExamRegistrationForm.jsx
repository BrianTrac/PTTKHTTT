import React, { useState } from "react";

const ExamRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    examType: "",
    birthDate: "",
    cccd: "",
    address: "",
    phone: "",
    csvFile: null
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setFormData((prev) => ({
        ...prev,
        csvFile: file
      }));
    } else {
      alert("Vui lòng chọn file CSV");
    }
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
    alert("Đã lưu thông tin thành công!");
  };

  const handleViewSchedule = () => {
    alert("Xem lịch thi");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center"
      style={{ fontFamily: "Tahoma, sans-serif" }}
    >
      <div className="w-full max-w-5xl bg-white rounded-xl border-2 border-blue-900 shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 tracking-wide">
            THÔNG TIN ĐĂNG KÝ THI
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-900 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Họ và tên */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-blue-900 font-semibold text-lg">
                  Họ và tên
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-900 text-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all duration-200 hover:border-blue-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-blue-900 font-semibold text-lg">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="abc@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-900 text-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all duration-200 hover:border-blue-400"
                />
              </div>

              {/* Chọn loại kì thi */}
              <div className="space-y-2">
                <label htmlFor="examType" className="block text-blue-900 font-semibold text-lg">
                  Chọn loại kì thi
                </label>
                <select
                  id="examType"
                  value={formData.examType}
                  onChange={(e) => handleInputChange("examType", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-900 text-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all duration-200 hover:border-blue-400 bg-white"
                >
                  <option value="">Chọn loại kì thi</option>
                  <option value="ielts">IELTS</option>
                  <option value="toefl">TOEFL</option>
                  <option value="toeic">TOEIC</option>
                  <option value="sat">SAT</option>
                  <option value="gmat">GMAT</option>
                </select>
              </div>

              {/* File danh sách */}
              <div className="space-y-2">
                <label htmlFor="csvFile" className="block text-blue-900 font-semibold text-lg">
                  File danh sách
                </label>
                <p className="text-sm text-gray-500 mb-3">(Thí sinh thi tự do bỏ qua mục này)</p>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      id="csvFile"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 border-2 border-dashed border-blue-900 text-blue-900 rounded-lg cursor-pointer hover:bg-blue-50 transition-all duration-200 bg-white"
                    />
                    {formData.csvFile && (
                      <p className="text-sm text-green-600 mt-2">
                        📄 {formData.csvFile.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Xem lịch thi button */}
                  <button
                    type="button"
                    onClick={handleViewSchedule}
                    className="w-full px-4 py-3 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-all duration-200 font-semibold"
                  >
                    Xem lịch thi
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Ngày sinh */}
              <div className="space-y-2">
                <label htmlFor="birthDate" className="block text-blue-900 font-semibold text-lg">
                  Ngày sinh
                </label>
                <input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-900 text-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all duration-200 hover:border-blue-400"
                />
              </div>

              {/* CCCD */}
              <div className="space-y-2">
                <label htmlFor="cccd" className="block text-blue-900 font-semibold text-lg">
                  CCCD
                </label>
                <input
                  id="cccd"
                  type="text"
                  placeholder="0123411211"
                  value={formData.cccd}
                  onChange={(e) => handleInputChange("cccd", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-900 text-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all duration-200 hover:border-blue-400"
                />
              </div>

              {/* Địa chỉ */}
              <div className="space-y-2">
                <label htmlFor="address" className="block text-blue-900 font-semibold text-lg">
                  Địa chỉ
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="123 street"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-900 text-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all duration-200 hover:border-blue-400"
                />
              </div>

              {/* SĐT */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-blue-900 font-semibold text-lg">
                  SĐT
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="0900123456"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-900 text-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all duration-200 hover:border-blue-400"
                />
              </div>

              {/* Lưu button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-900 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 mt-8"
              >
                LƯU THÔNG TIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamRegistrationForm;