import userLessonModels from "../models/userLesson_model";

const userLessonController = {
    checkStatus: async (userId: string, lessonId: string) => {
        const data = await userLessonModels.checkStatus(userId, lessonId);
        return data;
    },
    updateStatus: async (userId: string, lessonId: string) => {
        const data = await userLessonModels.updateStatus(userId, lessonId);
        return data;
    }
}

export default userLessonController;