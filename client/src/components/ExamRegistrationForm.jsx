"use client";

import { useState } from "react";

export default function ExamRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    examType: "",
    birthDate: "",
    cccd: "",
    address: "",
    phone: "",
    file: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  // Chuyển examType sang chữ hoa trước khi gửi
  const dataToSend = {
    ...formData,
    examType: formData.examType.toUpperCase(),
  };
  console.log("Form submitted:", dataToSend);
  alert("Đã lưu thông tin thành công!");
  // Nếu có gửi API thì dùng dataToSend thay vì formData
};

  return (
    <div
      className="min-h-screen bg-gray-50 p-4 flex items-center justify-center"
      style={{ fontFamily: "Tahoma, sans-serif" }}
    >
      <div className="w-full max-w-4xl bg-white rounded-lg border border-[#033060] shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#033060] mb-4">
            THÔNG TIN ĐĂNG KÝ THI
          </h1>
          <div className="w-full h-px bg-[#033060]"></div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Họ và tên */}
              <div>
                <label htmlFor="fullName" className="text-[#033060] font-medium block mb-1">
                  Họ và tên
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="w-full px-4 py-2 border border-[#033060] rounded-md text-[#033060] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-[#033060] font-medium block mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-[#033060] rounded-md text-[#033060] focus:outline-none"
                />
              </div>

              {/* Loại kì thi */}
              <div>
                <label htmlFor="examType" className="text-[#033060] font-medium block mb-1">
                  Chọn loại kì thi
                </label>
                <select
                  id="examType"
                  value={formData.examType}
                  onChange={(e) => handleInputChange("examType", e.target.value)}
                  className="w-full px-4 py-2 border border-[#033060] rounded-md text-[#033060] bg-white focus:outline-none"
                >
                  <option value="">-- Chọn loại kì thi --</option>
                  <option value="ielts">IELTS</option>
                  <option value="toefl">TOEFL</option>
                  <option value="sat">SAT</option>
                </select>
              </div>

              {/* File danh sách */}
              <div>
                <label htmlFor="fileList" className="text-[#033060] font-medium block mb-1">
                  File danh sách
                </label>
                <input
                  id="fileList"
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleInputChange("file", e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-[#033060] rounded-md text-[#033060] bg-white"
                />
                <p className="text-sm text-gray-500 mt-1">(Thí sinh thi tự do bỏ qua mục này)</p>
              </div>

              {/* Xem lịch thi */}
              <button
                type="button"
                onClick={() => alert("Xem lịch thi")}
                className="w-full px-4 py-3 mt-4 border border-[#033060] text-[#033060] font-semibold rounded-md hover:bg-[#033060] hover:text-white transition"
              >
                Xem lịch thi
              </button>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Ngày sinh */}
              <div>
                <label htmlFor="birthDate" className="text-[#033060] font-medium block mb-1">
                  Ngày sinh
                </label>
                <input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="w-full px-4 py-2 border border-[#033060] rounded-md text-[#033060] focus:outline-none"
                />
              </div>

              {/* CCCD */}
              <div>
                <label htmlFor="cccd" className="text-[#033060] font-medium block mb-1">
                  CCCD
                </label>
                <input
                  id="cccd"
                  type="text"
                  placeholder="Nhập số CCCD"
                  value={formData.cccd}
                  onChange={(e) => handleInputChange("cccd", e.target.value)}
                  className="w-full px-4 py-2 border border-[#033060] rounded-md text-[#033060] focus:outline-none"
                />
              </div>

              {/* Địa chỉ */}
              <div>
                <label htmlFor="address" className="text-[#033060] font-medium block mb-1">
                  Địa chỉ
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Nhập địa chỉ"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-4 py-2 border border-[#033060] rounded-md text-[#033060] focus:outline-none"
                />
              </div>

              {/* SĐT */}
              <div>
                <label htmlFor="phone" className="text-[#033060] font-medium block mb-1">
                  SĐT
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-2 mb-6 border border-[#033060] rounded-md text-[#033060] focus:outline-none"
                />
              </div>

              {/* Nút lưu */}
              <button
                type="submit"
                className="w-full px-4 py-3 mt-4 bg-[#033060] text-white font-semibold rounded-md hover:bg-[#02224e] transition"
              >
                Lưu
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
