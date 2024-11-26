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

    },
    getUserById: async (userId: string) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8080/api/v1/users/${userId}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data.message);
                throw new Error(error.response.data.message || 'Lấy thông tin người dùng thất bại');
            } else if (error.request) {
                console.error('Không nhận được phản hồi từ server:', error.request);
                throw new Error('Không thể kết nối tới server');
            } else {
                console.error('Lỗi khác:', error.message);
                throw new Error(error.message);
            }
        }
    },
    updateUser: async (data: any) => {
        try {
            const response = await axios.put(`http://10.0.2.2:8080/api/v1/users/update`, data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data.message);
                throw new Error(error.response.data.message || 'Cập nhật thông tin người dùng thất bại');
            } else if (error.request) {
                console.error('Không nhận được phản hồi từ server:', error.request);
                throw new Error('Không thể kết nối tới server');
            } else {
                console.error('Lỗi khác:', error.message);
                throw new Error(error.message);
            }
        }
    },
    register: async (email: string, password: string, role: boolean) => {
      try {
        const response = await axios.post(
          "http://10.0.2.2:8080/api/v1/users/register",
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
};

export default userModels;
