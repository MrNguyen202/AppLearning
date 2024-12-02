import billModels from "../models/bill_model";

const billController = {
  addBill: async (bill: any) => {
    try {
      const newBill = await billModels.addBill(bill);
      return newBill; // Trả về Bill đã được thêm
    } catch (error: any) {
      console.error("Lỗi trong Bill Controller:", error.message);
      throw new Error(error.message);
    }
  },
};

export default billController;
