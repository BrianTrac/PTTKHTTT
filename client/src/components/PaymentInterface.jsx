import React, { useState, useEffect } from 'react';
import { Search, QrCode, Check } from 'lucide-react';
import { fetchInvoiceById } from '../services/service'; // Đường dẫn đúng với file gọi API

export default function PaymentInfoInterface() {
  const [invoiceId, setInvoiceId] = useState('');
  const [discount, setDiscount] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [searchError, setSearchError] = useState('');

  const paymentMethods = [
    { name: 'Agribank', id: 'agribank' },
    { name: 'MB Bank', id: 'mbbank' },
    { name: 'Zalo Pay', id: 'zalopay' },
  ];

  const handlePaymentMethodToggle = (methodId) => {
    setSelectedPaymentMethods((prev) =>
      prev.includes(methodId)
        ? prev.filter((id) => id !== methodId)
        : [...prev, methodId]
    );
  };

  const handleSendEmail = async () => {
    if (!invoiceId.trim()) {
      alert('Vui lòng nhập mã hóa đơn!');
      return;
    }
    if (selectedPaymentMethods.length === 0) {
      alert('Vui lòng chọn phương thức thanh toán!');
      return;
    }
    const paymentMethod = selectedPaymentMethods[0];
    try {
      const res = await fetch(
        `http://localhost:5000/api/hoadons/${invoiceId}/send-email?HinhThucThanhToan=${paymentMethod}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        alert(`Gửi email thành công tới ${json.data.recipient}`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        alert(json.message || "Gửi email thất bại!");
      }
    } catch (err) {
      alert("Lỗi khi gửi email!");
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!invoiceId.trim()) {
      setSearchError('Vui lòng nhập mã hóa đơn!');
      return;
    }
    const result = await fetchInvoiceById(invoiceId.trim());
    if (result.success) {
      setInvoiceData(result.data);
      setSearchError('');
      setDiscount(result.data.GiamGia?.toString() || '');
      setPaymentAmount(result.data.ThanhTien?.toString() || '');
    } else {
      setInvoiceData(null);
      setSearchError(result.message || 'Không tìm thấy hóa đơn');
    }
  };

  // Cập nhật lại thành tiền nếu người dùng thay đổi giảm giá
  useEffect(() => {
  if (invoiceData) {
    const soTien = invoiceData.SoTien || 0;
    const giamGia = parseFloat(discount) || 0;
    setPaymentAmount((soTien * (1 - giamGia / 100)).toString());
  }
}, [discount, invoiceData]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>Email đã được gửi thành công với {selectedPaymentMethods.length} phương thức thanh toán!</span>
          </div>
        </div>
      )}

      <div className="border-2 border-gray-400 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          GỬI THÔNG TIN THANH TOÁN
        </h1>

        {/* Search Section */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Nhập ID hóa đơn"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Invoice Details Table */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Chi tiết hóa đơn</h3>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Mã HĐ</th>
                  <th className="px-4 py-3 text-left font-semibold">Tên khách hàng</th>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">Số tiền (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData ? (
                  <tr className="border-b">
                    <td className="px-4 py-4 border-r">{invoiceData.MaHoaDon || 'N/A'}</td>
                    <td className="px-4 py-4 border-r">{invoiceData.TenKhachHang || 'N/A'}</td>
                    <td className="px-4 py-4 border-r">{invoiceData.Email || 'N/A'}</td>
                    <td className="px-4 py-4">{invoiceData.SoTien?.toLocaleString() || 'N/A'}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      {searchError || 'Không có dữ liệu'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Amount Summary */}
        <div className="flex justify-end mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 min-w-20">
                Giảm giá:
              </label>
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 min-w-20">
                Thành tiền:
              </label>
              <input
                type="text"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-3 gap-8">
            {paymentMethods.map((method, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handlePaymentMethodToggle(method.id)}
                >
                  <QrCode className="w-12 h-12 text-gray-600" />
                </div>
                <div
                  className={`w-6 h-6 border-2 mx-auto cursor-pointer transition-colors rounded ${
                    selectedPaymentMethods.includes(method.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400 hover:border-blue-500'
                  }`}
                  onClick={() => handlePaymentMethodToggle(method.id)}
                >
                  {selectedPaymentMethods.includes(method.id) && (
                    <Check className="w-4 h-4 text-white mx-auto" />
                  )}
                </div>
                <h3 className="text-blue-700 font-semibold mt-2">{method.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Send Email Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSendEmail}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Gửi email
          </button>
        </div>
      </div>
    </div>
  );
}
