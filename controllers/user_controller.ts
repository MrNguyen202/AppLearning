import userModels from "../models/user_models";

const userController = {
    checkLogin: async (email: string, password: string) => {
        const data = await userModels.checkLogin(email, password);
        // console.log(data)
        return data;

    },
    getUserById: async (userId: string) => {
        const data = await userModels.getUserById(userId);
        // console.log(data);
        return data;
    },
    updateUser: async (data: any) => {
        const response = await userModels.updateUser(data);
        // console.log(response);
        return response;
    },
    register: async (email: string, password: string, role: boolean) => {
        const response = await userModels.register(email, password, role);
        // console.log(response);
        return response;
    },
}

export default userController;