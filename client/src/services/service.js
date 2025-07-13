// services/registrationService.js
export async function fetchRegistrations() {
  try {
    const res = await fetch("http://localhost:5000/api/phieudangky");
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.data; // vì bạn trả về { success, message, data, total }
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
}

// services/api.js (hoặc nơi bạn tổ chức gọi API)
export const fetchInvoiceById = async (invoiceId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/hoadons/${invoiceId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API lấy hóa đơn:", error);
    return { success: false, message: "Lỗi gọi API" };
  }
};

export const fetchExamSchedules = async (page = 1, limit = 5) => {
  try {
    const res = await fetch(`http://localhost:5000/api/lichthi?page=${page}&limit=${limit}`)
    if (!res.ok) throw new Error("Lỗi khi gọi API")
    return await res.json()
  } catch (error) {
    console.error("Lỗi fetchExamSchedules:", error)
    return { success: false, data: [], pagination: { currentPage: 1, totalPages: 1 } }
  }
}

