"use client"

import { useEffect, useState } from "react"
import { fetchRegistrations } from "../services/service"

// Hàm định dạng trạng thái
const formatStatus = (statusCode) => {
  switch (statusCode) {
    case "Cho_duyet":
      return { label: "Chờ duyệt", color: "bg-yellow-100 text-yellow-800" }
    case "Da_duyet":
      return { label: "Đã duyệt", color: "bg-green-100 text-green-800" }
    case "Tu_choi":
      return { label: "Từ chối", color: "bg-red-100 text-red-700" }
    default:
      return { label: "Không rõ", color: "bg-gray-100 text-gray-700" }
  }
}

export default function ViewRegistrationList() {
  const [registrationData, setRegistrationData] = useState([])
  const [searchId, setSearchId] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  useEffect(() => {
    const loadData = async () => {
      const rawData = await fetchRegistrations()

      const mappedData = rawData.map((item, index) => {
        const statusInfo = formatStatus(item.TrangThai)

        return {
          id: item.ThiSinh?.MaThiSinh?.toString() || `fallback-${index}`,
          fullName: item.ThiSinh?.Ten || item.KhachHang?.Ten || "Không rõ",
          birthDate: (item.ThiSinh?.NgaySinh || item.KhachHang?.NgaySinh || "").slice(0, 10),
          registrationDate: (item.NgayDangKy || "").replace("T", " ").slice(0, 19),
          examType: item.LichThi?.TenLichThi || "Không rõ",
          customerCode: item.KhachHang?.MaKhachHang?.toString() || "Không rõ",
          status: statusInfo,
          examDate: (item.LichThi?.ThoiGianThi || "").replace("T", " ").slice(0, 19),
        }
      })

      setRegistrationData(mappedData)
    }

    loadData()
  }, [])

  const filteredData = searchId.trim()
    ? registrationData.filter((item) =>
        item.id.toLowerCase().includes(searchId.toLowerCase())
      )
    : registrationData

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: "Tahoma, sans-serif" }}>
      <div className="max-w-7xl mx-auto bg-white rounded-lg border border-gray-300 shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#033060]">Xem danh sách đăng ký</h1>
        </div>

        {/* Search */}
        <div className="mb-8 p-5 border border-gray-300 rounded-md bg-gray-100">
          <div className="flex items-center gap-4 flex-wrap">
            <label htmlFor="searchId" className="text-[#033060] font-medium whitespace-nowrap">
              Tìm kiếm bằng ID:
            </label>
            <input
              id="searchId"
              type="text"
              value={searchId}
              onChange={(e) => {
                setSearchId(e.target.value)
                setCurrentPage(1)
              }}
              className="w-64 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#033060]"
              placeholder="Nhập ID thí sinh"
            />
            <button
              onClick={() => setCurrentPage(1)}
              className="px-5 py-2 bg-[#033060] text-white rounded hover:bg-[#022850]"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[15px] text-[#033060]">
            <thead className="bg-[#033060] text-white">
              <tr>
                {["Mã thí sinh", "Họ và tên", "Ngày sinh", "Ngày đăng ký", "Kỳ thi", "Mã KH", "Trạng thái", "Ngày thi"].map((header) => (
                  <th key={header} className="p-3 font-semibold border-b border-[#c7d6ea] text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-[#f1f5fa]"}>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">
                    {item.id.startsWith("fallback") ? "N/A" : item.id}
                  </td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.fullName}</td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.birthDate}</td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.registrationDate}</td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.examType}</td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.customerCode}</td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">
                    <span className={`${item.status.color} px-3 py-1 rounded-full text-sm`}>
                      {item.status.label}
                    </span>
                  </td>
                  <td className="p-3 text-center border-b border-[#e0e7ef]">{item.examDate}</td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
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
