"use client"

import { useEffect, useState } from "react"
import { fetchExamSchedules } from "../services/service"

export default function ExamSchedulePage() {
  const [examData, setExamData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const rowsPerPage = 5

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchExamSchedules(currentPage, rowsPerPage)
      if (response && response.success) {
        setExamData(response.data || [])
        setTotalPages(response.pagination?.totalPages || 1)
      }
    }

    loadData()
  }, [currentPage])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: "Tahoma, sans-serif" }}>
      <div className="max-w-7xl mx-auto bg-white rounded-lg border border-gray-300 shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#033060]">Lịch thi trung tâm ABC năm 2024</h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[15px] text-[#033060]">
            <thead className="bg-[#033060] text-white">
              <tr>
                {["Mã lịch thi", "Tên cuộc thi", "Thời gian thi", "Đã đăng ký", "Tối thiểu", "Tối đa"].map((header) => (
                  <th key={header} className="p-3 font-semibold border-b border-[#c7d6ea] text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {examData.map((item, index) => (
                <tr key={item.MaLichThi || index} className={index % 2 === 0 ? "bg-white" : "bg-[#f1f5fa]"}>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.MaLichThi}</td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.TenLichThi}</td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">
                    {new Date(item.ThoiGianThi).toLocaleString("vi-VN", {
                      dateStyle: "short",
                      timeStyle: "short"
                    })}
                  </td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.SoLuongDaDangKi || 0}</td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.SoLuongToiThieu}</td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.SoLuongToiDa}</td>
                </tr>
              ))}
              {examData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Không có dữ liệu phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Trước
          </button>
          <span className="text-[#033060] text-[15px]">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  )
}
