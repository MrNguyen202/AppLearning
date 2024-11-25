import categoryModel from "../models/category_model";

const categoryController = {
    getCategories: async () => {
        const data = await categoryModel.getCategory();
        // console.log(data);
        return data;
    }
    
}

export default categoryController;