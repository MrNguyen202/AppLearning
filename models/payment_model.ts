import axios from "axios";

const paymentModels = {
  getPayments: async () => {
    try {
      // Gửi request GET tới endpoint API lấy danh sách payments
      const response = await axios.get("http://192.168.102.155:8080/api/v1/payments");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Lỗi từ phía server
        console.error("Lỗi từ server:", error.response.data.message);
        throw new Error(error.response.data.message || "Lỗi khi lấy danh sách payments");
      } else if (error.request) {
        // Server không phản hồi
        console.error("Không nhận được phản hồi từ server:", error.request);
        throw new Error("Không thể kết nối tới server");
      } else {
        // Lỗi khác (ví dụ: lỗi thiết lập request)
        console.error("Lỗi khác:", error.message);
        throw new Error(error.message);
      }
    }
  }
};

export default paymentModels;