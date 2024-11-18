import userModels from "../models/user_models";

const userController = {
    checkLogin: async (email: string, password: string) => {
        return await userModels.checkLogin(email, password);
    }
}

export default userController;