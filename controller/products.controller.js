const products = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { product_name, price, seller } = req.body;

    const newProduct = new products({
      product_name,
      price,
      seller
    });

    await newProduct.save();
    return res.status(201).json({ message: "product added successfully " });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const listProducts = async (req, res) => {
  try {
    const productList = await products.find({});
    if (!productList) {
      return res.status(404).json({ message: "product list empty" });
    }

    return res
      .status(200)
      .json({ message: "list fetched successfully", productList });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};



const updateProduct = async(req, res) => {
    try {

        const { id } = req.params
        const { product_name, price, seller, is_available } = req.body;

        if (product_name || price || seller) {

        const product = await products.findOne({ _id:id })

        if(!product){
            return res.status(404).json({ error: 'product not found '})
        }

        if (product_name) product.product_name = product_name
        if (price) product.price = price
        if (seller) product.seller = seller
        if (is_available) product.is_available = is_available

        await product.save()

        return res.status(200).json({ message: 'product updated successfully', product})
    } else {
        return res.status(400).json({ error: ' missing details'})
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Internal Server Error", error: error })
    }
}

const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        
        const product = await products.findByIdAndDelete({_id:id})

        if(!product){
            return res.status(404).json({ error: 'product not found '})
        }

        return res.status(200).json({ message: 'product deleted successfully '})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Internal Server Error", error: error })
    }
}


module.exports = {
    createProduct,
    listProducts,
    updateProduct,
    deleteProduct
}