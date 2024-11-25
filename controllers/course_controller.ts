import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import courseModels from "../models/course_model";

const courseController = {
  // Lấy danh sách khóa học
  getCourses: async () => {
    try {
      const data = await courseModels.getCourses();
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error.message);
      throw error;
    }
  },

  getCoursesTop: async (top:number) => {
    try {
      const data = await courseModels.getCoursesTop(top);
      // console.log(data)
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error.message);
      throw error;
    }
  },


  // Lấy thông tin chi tiết một khóa học
  getCourseById: async (id) => {
    try {
      const data = await courseModels.getCourseById(id);
      return data;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin khóa học với id ${id}:`, error.message);
      throw error;
    }
  },
  getSearchCourses: async (search: string) => {
    try {
      const data = await courseModels.getSearchCourses(search);
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error.message);
      throw error;
    }
  }
};

export default courseController;
