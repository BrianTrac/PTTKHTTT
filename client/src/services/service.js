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

