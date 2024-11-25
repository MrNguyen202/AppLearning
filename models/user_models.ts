import axios from "axios";

// const url = "http://192.168.1.5:8080/api/v1/users/login"
const url  = "http://10.0.2.2:8080/api/v1/users/login"

const userModels = {
    checkLogin: async (email: string, password: string) => {
      
        try {
          const response = await axios.post(
            url,
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
          return response.data; 
        } catch (error: any) {
          if (error.response) {
            console.error('Lỗi từ server:', error.response.data.message);
            throw new Error(error.response.data.message || 'Đăng nhập thất bại');
          } else if (error.request) {
            console.error('Không nhận được phản hồi từ server:', error.request);
            throw new Error('Không thể kết nối tới server');
          } else {
            console.error('Lỗi khác:', error.message);
            throw new Error(error.message);
          }
        }
    }
};

export default userModels;
