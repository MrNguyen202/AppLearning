import courseModel from "../models/course_model";

const courseController = {
    getCourses: async () => {
        const data = await courseModel.getCourses();
        // console.log(data);
        return data;
    },
    getCoursesByTeacherId: async (teacherId: string) => {
        const data = await courseModel.getCoursesByTeacherId(teacherId);
        // console.log(data);
        return data;
    },
    getMyCourses: async (userId: string) => {
        const data = await courseModel.getMyCourses(userId);
        // console.log(data);
        return data;
    }
};

export default courseController;

