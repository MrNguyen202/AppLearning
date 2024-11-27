import axios from "axios";
const userLessonModels = {
    checkStatus: async (userId: string, lessonId: string) => {
        try {
            // Gửi yêu cầu GET tới API để lấy trạng thái bài học cho user cụ thể
            const response = await axios.get(
                `http://192.168.1.176:8080/api/v1/lesson-user/status/${userId}/${lessonId}`  

              );
      
            // Trả về dữ liệu trạng thái từ response
            return response.data; // Giả sử API trả về một đối tượng chứa trạng thái
          } catch (error: any) {
            if (error.response) {
              console.error('Lỗi từ server:', error.response.data.message);
              throw new Error(error.response.data.message || 'Không thể lấy trạng thái');
            } else if (error.request) {
              console.error('Không nhận được phản hồi từ server:', error.request);
              throw new Error('Không thể kết nối tới server');
            } else {
              console.error('Lỗi khác:', error.message);
              throw new Error(error.message);
            }
          }
    },

    updateStatus: async (userId: string, lessonId: string) => {
      try {
        // Gửi yêu cầu PUT tới API để cập nhật trạng thái bài học cho user cụ thể\
        console.log(userId +" abc "+ lessonId);
        const response = await axios.put(
          'http://192.168.1.176:8080/api/v1/lesson-user/update-status',
          {
            userId: userId,
            lessonId: lessonId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        // Trả về dữ liệu trạng thái từ response
        return response.data; // Giả sử API trả về một đối tượng chứa trạng thái
      } catch (error: any) {
        if (error.response) {
          console.error('Lỗi từ server:', error.response.data.message);
          throw new Error(error.response.data.message || 'Không thể lấy trạng thái');
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

export default userLessonModels;