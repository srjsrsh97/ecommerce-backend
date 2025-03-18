const purchase = require("../models/purchase.model");

const placeOrder = async (req, res) => {
  try {
    const {
      user_name,
      quantity,
      product,
      order_amount,
      payment_method,
      seller,
      delivery_address,
      delivery_pincode,
    } = req.body;

    const newPurchase = new purchase({
      user_name,
      quantity,
      product,
      order_amount,
      payment_method,
      seller,
      delivery_address,
      delivery_pincode,
    });

    await newPurchase.save();

    return res
      .status(201)
      .json({ message: "order placed successfully", newPurchase });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { delivery_address, delivery_pincode } = req.body;

    const orderDetails = await purchase.findById({ _id: id });

    if (!orderDetails) {
      return res.status(404).json({ error: "order not found" });
    }
    if (delivery_address) orderDetails.delivery_address = delivery_address;
    if (delivery_pincode) orderDetails.delivery_pincode = delivery_pincode;

    await orderDetails.save();

    return res
      .status(200)
      .json({ message: "order updated successfully", orderDetails });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetails = await purchase.findById({ _id: id });
    if (!orderDetails) {
      return res.status(404).json({ error: "order not found" });
    }

    return res
      .status(200)
      .json({ message: "details fetched successfully", orderDetails });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetails = await purchase.findById({ _id: id });
    if (!orderDetails) {
      return res.status(404).json({ error: "order not found" });
    }

    orderDetails.is_cancelled = true;

    await orderDetails.save();

    return res
      .status(200)
      .json({ message: "order cancelled successfully", orderDetails });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const getOrderDetailsByUser = async (req, res) => {
  try {
    const { user_name } = req.body;
    const orderDetails = await purchase.find({ user_name: user_name });
    if (!orderDetails) {
      return res.status(404).json({ error: "order not found" });
    }

    return res
      .status(200)
      .json({ message: "details fetched successfully", orderDetails });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_delivered } = req.body;
    if (!is_delivered) {
      return res.status(400).json({ error: "missing fields" });
    }
    const orderDetails = await purchase.findById({ _id: id });
    if (!orderDetails) {
      return res.status(404).json({ error: "order not found" });
    }
    orderDetails.is_delivered = is_delivered;

    await orderDetails.save();
    return res
      .status(200)
      .json({ message: "order status updated successfully " });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

module.exports = {
  placeOrder,
  updateOrder,
  getOrderDetails,
  cancelOrder,
  getOrderDetailsByUser,
  updateOrderStatus,
};
