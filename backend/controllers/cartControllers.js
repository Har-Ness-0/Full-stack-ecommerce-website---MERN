import Cart from "../models/cartModel.js";
import Product from "../models/ProductModel.js";

export async function addItem(req, res) {
  console.log("req.user:", req.user);
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({
        userId: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }
    await cart.save();
    return res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.error("Error in addItem:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function UpdateItem(req, res) {}
export async function deleteItem(req, res) {}
