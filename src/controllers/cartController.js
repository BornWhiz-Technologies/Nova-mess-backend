const {
  addToCart,
  getStudentCart,
  removeFromCart,
} = require("../services/cartService");

const { sendResponse } = require("../utils/response");

// ADD TO CART
const addCartItem = async (req, res) => {
  try {
    const { foodName, price, quantity = 1 } = req.body;

    if (!foodName || price === undefined) {
      return sendResponse(res, 400, false, "Food name and price are required");
    }

    const item = {
      foodName,
      price: Number(price),
      quantity: Number(quantity),
    };

    const cart = await addToCart(req.user.id, item);

    return sendResponse(res, 200, true, "Your menu added to cart", cart);
  } catch (error) {
    console.error("Add Cart Error:", error);

    return sendResponse(res, 500, false, error.message);
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await getStudentCart(req.user.id);

    return sendResponse(
      res,
      200,
      true,
      "Cart fetched successfully",
      cart || {
        items: [],
        totalAmount: 0,
      },
    );
  } catch (error) {
    console.error("Get Cart Error:", error);

    return sendResponse(res, 500, false, error.message);
  }
};

// REMOVE ITEM FROM CART
const removeCartItem = async (req, res) => {
  try {
    const { foodName } = req.params;

    if (!foodName) {
      return sendResponse(res, 400, false, "Food name is required");
    }

    const cart = await removeFromCart(req.user.id, foodName);

    return sendResponse(res, 200, true, "Item removed from cart", cart);
  } catch (error) {
    console.error("Remove Cart Error:", error);

    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  addCartItem,
  getCart,
  removeCartItem,
};
