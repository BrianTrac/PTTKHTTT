import React, { useState } from "react";
import { Check } from "lucide-react";

export default function RenewalCheckInterface() {
	const [requestCode, setRequestCode] = useState("");
	const [projectInfo, setProjectInfo] = useState({
		code: "",
		price: "",
		extensions: "",
		requestDate: "",
		reason: "",
	});
	const [showNotification, setShowNotification] = useState(false);
	const [showImageModal, setShowImageModal] = useState(false);

	const [evidenceImage, setEvidenceImage] = useState({
		name: "",
		url: "",
	});

	const handleConfirm = async () => {
		if (!requestCode.trim()) {
			alert("Vui lòng nhập mã yêu cầu!");
			return;
		}
		try {
			const res = await fetch(
				"http://localhost:5000/api/yeucaugiahan/confirm",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ MaYeuCau: Number(requestCode) }),
				}
			);
			const json = await res.json();
			if (json.success) {
				setShowNotification(true);
				setTimeout(() => setShowNotification(false), 3000);
				// Cập nhật lại thông tin nếu muốn
				if (json.data) {
					setProjectInfo((prev) => ({
						...prev,
						extensions: json.data.SoLanDaGiaHan?.toString() || prev.extensions,
					}));
				}
			} else {
				alert(json.message || "Xác nhận thất bại!");
			}
		} catch (err) {
			alert("Lỗi khi xác nhận!");
			console.error(err);
		}
	};

	const handleReject = async () => {
		if (!requestCode.trim()) {
			alert("Vui lòng nhập mã yêu cầu!");
			return;
		}
		try {
			const res = await fetch("http://localhost:5000/api/yeucaugiahan/reject", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ MaYeuCau: Number(requestCode) }),
			});
			const json = await res.json();
			if (json.success) {
				setShowNotification(true);
				setTimeout(() => setShowNotification(false), 3000);
				// Cập nhật lại thông tin nếu muốn
				if (json.data) {
					setProjectInfo((prev) => ({
						...prev,
						extensions: json.data.SoLanDaGiaHan?.toString() || prev.extensions,
					}));
				}
			} else {
				alert(json.message || "Xác nhận thất bại!");
			}
		} catch (err) {
			alert("Lỗi khi xác nhận!");
			console.error(err);
		}
	};

	const handleSearch = async () => {
		if (!requestCode.trim()) {
			alert("Vui lòng nhập mã yêu cầu!");
			return;
		}
		try {
			const res = await fetch(
				`http://localhost:5000/api/yeucaugiahan/${requestCode}`
			);
			const json = await res.json();
			if (json.success && json.data) {
				setProjectInfo({
					code: json.data.MaPhieuDuThi || "",
					price: json.data.PhiGiaHan?.toLocaleString() || "",
					extensions: json.data.SoLanDaGiaHan?.toString() || "",
					requestDate: json.data.NgayYeuCau || "",
					reason: json.data.LyDo || "",
				});
				setEvidenceImage({
					name: "bang_chung_gia_han.jpg",
					url:
						json.data.BangChung ||
						"https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Bằng+Chứng+Gia+Hạn",
				});
			} else {
				alert("Không tìm thấy yêu cầu gia hạn này!");
				setProjectInfo({
					code: "",
					price: "",
					extensions: "",
					requestDate: "",
					reason: "",
				});
				setEvidenceImage({
					name: "",
					url: "",
				});
			}
		} catch (err) {
			alert("Lỗi khi lấy dữ liệu!");
			console.error(err);
		}
	};

	const handleViewImage = () => {
		setShowImageModal(true);
	};

	const handleCloseModal = () => {
		setShowImageModal(false);
	};

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white">
			{/* Notification */}
			{showNotification && (
				<div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
					<div className="flex items-center gap-2">
						<Check className="w-5 h-5" />
						<span>Cập nhật thành công!</span>
					</div>
				</div>
			)}

			{/* Image Modal */}
			{showImageModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg p-4 max-w-4xl max-h-full overflow-auto">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Bằng chứng gia hạn
							</h3>
							<button
								onClick={handleCloseModal}
								className="text-gray-500 hover:text-gray-700 text-xl font-bold"
							>
								×
							</button>
						</div>
						<img
							src={evidenceImage.url}
							alt="Bằng chứng gia hạn"
							className="w-full h-auto rounded-lg"
						/>
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
								type="date"
								value={projectInfo.requestDate}
								readOnly
								className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
							/>
						</div>

						{/* Reason */}
						<div className="flex items-center">
							<label className="w-40 text-blue-600 font-semibold">Lý do:</label>
							<input
								type="text"
								value={projectInfo.reason}
								readOnly
								className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
							/>
						</div>

						{/* Evidence Display */}
						<div className="flex items-start">
							<label className="w-40 text-blue-600 font-semibold pt-2">
								Bằng chứng:
							</label>
							<div className="flex-1">
								<div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
									{/* Thumbnail */}
									<div
										className="w-full h-32 bg-gray-200 rounded-md overflow-hidden cursor-pointer"
										onClick={handleViewImage}
									>
										<img
											src={evidenceImage.url}
											alt="Bằng chứng"
											className="w-full h-full object-cover hover:opacity-80 transition-opacity"
										/>
									</div>

									<p className="text-xs text-gray-500 mt-2">
										Click vào ảnh để xem kích thước đầy đủ
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Confirm Button */}
				<div className="flex justify-center gap-5">
					<button
						onClick={handleReject}
						className="px-8 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
					>
						Từ chối
					</button>
					<button
						onClick={handleConfirm}
						className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
					>
						Chấp nhận
					</button>
				</div>
			</div>
		</div>
	);
}
