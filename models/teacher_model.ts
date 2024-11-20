import axios from "axios";

const teacherModel = {
    getTeachers: async () => {
        try {
            const response = await axios.get("http://10.0.2.2:8080/api/v1/teachers",);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data.message);
                throw new Error(error.response.data.message || 'Lấy danh sách giáo viên thất bại');
            } else if (error.request) {
                console.error('Không nhận được phản hồi từ server:', error.request);
                throw new Error('Không thể kết nối tới server');
            } else {
                console.error('Lỗi khác:', error.message);
                throw new Error(error.message);
            }
        }
    },
    getTeacherById: async (teacherId: string) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8080/api/v1/teachers/${teacherId}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data.message);
                throw new Error(error.response.data.message || 'Lấy thông tin giáo viên thất bại');
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

export default teacherModel;