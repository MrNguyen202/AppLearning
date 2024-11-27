import paymentModels from "../models/payment_model"

const paymentController = {
  getPayments: async () => {
    try {
      const payments = await paymentModels.getPayments();
      return payments; // Trả về danh sách payments
    } catch (error: any) {
      console.error("Lỗi trong Payment Controller:", error.message);
      throw new Error(error.message);
    }
  },
};

export default paymentController;