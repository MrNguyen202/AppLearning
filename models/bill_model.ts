import axios from "axios";

const billModels = {
  addBill: async (bill: any) => {
    try {
      // Gửi yêu cầu POST tới endpoint thêm bill
      const response = await axios.post("http://10.0.2.2:8080/api/v1/bills", bill);
      return response.data; // Trả về dữ liệu từ server (bill đã được thêm)
    } catch (error: any) {
      if (error.response) {
        // Lỗi từ phía server (4xx, 5xx)
        console.error("Lỗi từ server:", error.response.data.message);
        throw new Error(error.response.data.message || "Lỗi khi thêm Bill");
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        console.error("Không nhận được phản hồi từ server:", error.request);
        throw new Error("Không thể kết nối tới server");
      } else {
        // Lỗi khác (thiết lập hoặc cấu hình request)
        console.error("Lỗi khác:", error.message);
        throw new Error(error.message);
      }
    }
  },
};

export default billModels;