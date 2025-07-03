import Product from "../models/ProductModel.js";

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    console.log("Error in getAllProducts controller", error);
    res.status(400);
  }
}

export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product fetched successfully" });
  } catch (error) {
    res.status(404).json({ message: "Error in fetching the data" });
    console.error("Error in getProduct controller", error);
  }
}

export async function createProduct(req, res) {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ message: "Error in CreateProduct controller" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error in CreateProduct controller", error);
  }
}

export async function updateProduct(req, res) {
  try {
    const { name, price, image } = req.body;
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        image,
      },
      { new: true }
    );

    if (!updateProduct) res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error in updating the product" });
    console.error("Error in updateNote controller");
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error in deleting the product" });
    console.error("Error in delete product controller");
  }
}
