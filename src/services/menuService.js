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

const getTodayMenus = async () => {
  const now = new Date();

  let mealType = "";
  const hour = now.getHours();

  if (hour >= 5 && hour < 11) {
    mealType = "Breakfast";
  } else if (hour >= 11 && hour < 16) {
    mealType = "Lunch";
  } else {
    mealType = "Dinner";
  }

  const menus = await Menu.find({
    mealType,
    available: true,
  }).sort({ createdAt: -1 });

  return menus.filter((menu) => {
    const menuDate = new Date(menu.date);

    return (
      menuDate.getFullYear() === now.getFullYear() &&
      menuDate.getMonth() === now.getMonth() &&
      menuDate.getDate() === now.getDate()
    );
  });
};

module.exports = {
  createMenu,
  getMenus,
  getTodayMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
};
