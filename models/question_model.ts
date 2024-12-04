import axios from "axios";

const questionModel = {
    addQuestion: async (email: string, password: string, role: boolean) => {
        try {
          const response = await axios.post(
            "http://10.0.2.2:8080/api/v1/questions/register",
            {
              email,
              password,
              role,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          return response.data; 
        } catch (error: any) {
          if (error.response) {
            console.error('Lỗi từ server:', error.response.data.message);
            throw new Error(error.response.data.message || 'Đăng ký thất bại');
          } else if (error.request) {
            console.error('Không nhận được phản hồi từ server:', error.request);
            throw new Error('Không thể kết nối tới server');
          } else {
            console.error('Lỗi khác:', error.message);
            throw new Error(error.message);
          }
        }
      }
}