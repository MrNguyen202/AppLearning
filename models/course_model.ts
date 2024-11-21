import axios from "axios";

const courseModels = {
  getCourses: async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:8080/api/v1/courses", 
      );
      return response.data; 
    } catch (error: any) {
      if (error.response) {
        console.error("Lỗi từ server:", error.response.data.message);
        throw new Error(error.response.data.message || "Không thể lấy danh sách khóa học");
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
        throw new Error("Không thể kết nối tới server");
      } else {
        console.error("Lỗi khác:", error.message);
        throw new Error(error.message);
      }
    }
  },
  
  getCourseById: async (id: string | number) => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/v1/courses/${id}`, // API để lấy thông tin khóa học cụ thể
      );
      return response.data; // Trả về dữ liệu của khóa học
    } catch (error: any) {
      if (error.response) {
        console.error("Lỗi từ server:", error.response.data.message);
        throw new Error(error.response.data.message || "Không thể lấy thông tin khóa học");
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
        throw new Error("Không thể kết nối tới server");
      } else {
        console.error("Lỗi khác:", error.message);
        throw new Error(error.message);
      }
    }
    },
    getCoursesTop: async (top: number) => {
        try {
          const response = await axios.get(
            `http://192.168.1.5:8080/api/v1/courses/top/${top}`, 
          );
          return response.data; 
        } catch (error: any) {
          if (error.response) {
            console.error("Lỗi từ server:", error.response.data.message);
            throw new Error(error.response.data.message || "Không thể lấy danh sách khóa học");
          } else if (error.request) {
            console.error("Không nhận được phản hồi từ server:", error.request);
            throw new Error("Không thể kết nối tới server");
          } else {
            console.error("Lỗi khác:", error.message);
            throw new Error(error.message);
          }
        }
      },
};

export default courseModels;
