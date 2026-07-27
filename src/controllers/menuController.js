const {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require("../services/menuService");

const { sendResponse } = require("../utils/response");

// Add Menu
const addMenu = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : "";

    const menuData = {
      managerId: req.user.id,
      foodName: req.body.foodName,
      category: req.body.category,
      mealType: req.body.mealType,
      description: req.body.description,
      price: req.body.price,
      available: req.body.available,
      date: req.body.date,
      image,
    };

    const menu = await createMenu(menuData);

    return sendResponse(res, 201, true, "Menu added successfully", menu);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

// Get All Menus
const getAllMenus = async (req, res) => {
  try {
    const menus = await getMenus();

    return sendResponse(res, 200, true, "Menus fetched successfully", menus);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

// Get Single Menu
const getSingleMenu = async (req, res) => {
  try {
    const menu = await getMenuById(req.params.id);

    return sendResponse(res, 200, true, "Menu fetched successfully", menu);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

const editMenu = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : "";

    const menuData = {
      ...req.body,
      managerId: req.user.id,
    };

    if (image) {
      menuData.image = image;
    }

    const menu = await updateMenu(req.params.id, menuData);

    return sendResponse(res, 200, true, "Menu updated successfully", menu);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

// Delete Menu
const removeMenu = async (req, res) => {
  try {
    await deleteMenu(req.params.id);

    return sendResponse(res, 200, true, "Menu deleted successfully");
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  addMenu,
  getAllMenus,
  getSingleMenu,
  editMenu,
  removeMenu,
};
