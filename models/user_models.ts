import axios from "axios";

const userModels = {
    checkLogin: async (email: string, password: string) => {
        try {
          const response = await axios.post(
            "http://10.0.2.2:8080/api/v1/users/login",
            {
              email,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data)
          return response.data; // Trả về dữ liệu nếu đăng nhập thành công
        } catch (error: any) {
          // Xử lý lỗi một cách rõ ràng hơn
          if (error.response) {
            // Lỗi từ server (4xx hoặc 5xx)
            console.error('Lỗi từ server:', error.response.data.message);
            throw new Error(error.response.data.message || 'Đăng nhập thất bại');
          } else if (error.request) {
            // Không nhận được phản hồi từ server
            console.error('Không nhận được phản hồi từ server:', error.request);
            throw new Error('Không thể kết nối tới server');
          } else {
            // Lỗi khác
            console.error('Lỗi khác:', error.message);
            throw new Error(error.message);
          }
        }
    }
};

export default userModels;
