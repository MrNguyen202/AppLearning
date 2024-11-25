import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const courseModel = {
    // Lấy danh sách khóa học top 10
    getCourses: async () => {
        try {
            const response = await axios.get("http://192.168.1.185:8080/api/v1/courses/popular",);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data.message);
                throw new Error(error.response.data.message || 'Lấy danh sách khóa học thất bại');
            } else if (error.request) {
                console.error('Không nhận được phản hồi từ server:', error.request);
                throw new Error('Không thể kết nối tới server');
            } else {
                console.error('Lỗi khác:', error.message);
                throw new Error(error.message);
            }
        }
    },
    // Lấy chi tiết khóa học theo teacherId
    getCoursesByTeacherId: async (teacherId: string) => {
        try {
            const response = await axios.get(`http://192.168.1.185:8080/api/v1/courses/teacher/${teacherId}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data.message);
                throw new Error(error.response.data.message || 'Lấy danh sách khóa học thất bại');
            } else if (error.request) {
                console.error('Không nhận được phản hồi từ server:', error.request);
                throw new Error('Không thể kết nối tới server');
            } else {
                console.error('Lỗi khác:', error.message);
                throw new Error(error.message);
            }
        }
    },

    //my course
    getMyCourses: async (userId: string) => {
        try {
            const response = await axios.get(`http://192.168.1.185:8080/api/v1/courses/student/${userId}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data.message);
                throw new Error(error.response.data.message || 'Lấy danh sách khóa học thất bại');
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

export default courseModel;