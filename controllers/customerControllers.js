import Customer from "../models/customerModel.js";
import auth from "../middleware/auth.js";

export const addCustomer = async (req, res) => {
  try {
    console.log("hello");
    const { name } = req.body;
    const newCustomer = new Customer({
      name,
    });

    const savedCustomer = await newCustomer.save();

    return res.status(200).json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).send;
  }
};

export const getCustomers = async (req, res) => {
  try {
    let customers = await Customer.find();

    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send;
  }
};
