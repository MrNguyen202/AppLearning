import categoryModels from "../models/category_model";

const categoryController = {
    getCategories: async () => {
        const data = await categoryModels.getCategory();
        return data;
    }

}

export default categoryController;