const Menu = require("../models/menu");

// Add Menu
const createMenu = async (menuData) => {
  return await Menu.create(menuData);
};

// Get All Menu
const getMenus = async () => {
  return await Menu.find().sort({ createdAt: -1 });
};

// Get Menu By Id
const getMenuById = async (id) => {
  return await Menu.findById(id);
};

// Update Menu
const updateMenu = async (id, data) => {
  return await Menu.findByIdAndUpdate(id, data, { new: true });
};

// Delete Menu
const deleteMenu = async (id) => {
  return await Menu.findByIdAndDelete(id);
};

module.exports = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
};
