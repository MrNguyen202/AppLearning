import userModels from "../models/user_models";

const userController = {
    checkLogin: async (email: string, password: string) => {
        const data = await userModels.checkLogin(email, password);
        // console.log(data)
        return data;
    }
}

export default userController;