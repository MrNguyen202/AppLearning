import teacherModel from "../models/teacher_model";

const teacherController = {
    getTeachers: async () => {
        const data = await teacherModel.getTeachers();
        // console.log(data);
        return data;
    },
    getTeacherById: async (teacherId: string) => {
        const data = await teacherModel.getTeacherById(teacherId);
        // console.log(data);
        return data;
    }
};

export default teacherController;