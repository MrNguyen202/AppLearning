import courseModel from "../models/course_model";

const courseController = {
    getCourses: async () => {
        const data = await courseModel.getCourses();
        // console.log(data);
        return data;
    }
};

export default courseController;

