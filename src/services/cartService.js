const Cart = require("../models/cart");

const addToCart = async (studentId, item) => {
  let cart = await Cart.findOne({ studentId });

  if (!cart) {
    cart = await Cart.create({
      studentId,
      items: [item],
      totalAmount: item.price * item.quantity,
    });

    return cart;
  }

  // Check whether the same food already exists
  const existingItem = cart.items.find(
    (cartItem) => cartItem.foodName === item.foodName,
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  // Recalculate total amount
  cart.totalAmount = cart.items.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0,
  );

  await cart.save();

  return cart;
};

const getStudentCart = async (studentId) => {
  return await Cart.findOne({ studentId });
};

const removeFromCart = async (studentId, foodName) => {
  const cart = await Cart.findOne({ studentId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const itemExists = cart.items.some(
    (cartItem) => cartItem.foodName === foodName,
  );

  if (!itemExists) {
    throw new Error("Item not found in cart");
  }

  // Remove selected food
  cart.items = cart.items.filter((cartItem) => cartItem.foodName !== foodName);

  // Recalculate total amount
  cart.totalAmount = cart.items.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0,
  );

  await cart.save();

  return cart;
};

module.exports = {
  addToCart,
  getStudentCart,
  removeFromCart,
};
