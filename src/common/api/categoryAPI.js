import axios from "axios";

export const getAllCategoriesAPI = async () => {
  try {
    const getCategories = await axios.get(
      `${import.meta.env.VITE_TWIN_API}/category`
    );
    return getCategories.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const createCategoryAPI = async (payload) => {
  try {
    const newCategory = await axios.post(
      `${import.meta.env.VITE_TWIN_API}/category/add`,
      payload
    );
    // const newCategory = await axios.post(
    //   `${import.meta.env.VITE_DEV_API}/category/add`,
    //   payload
    // );
    return newCategory.data;
  } catch (error) {
    console.log("Can't create category", error);
  }
};

export const deleteCategoryAPI = async (payload) => {
  try {
    const category = await axios.delete(
      `${import.meta.env.VITE_TWIN_API}/category/delete/${payload}`
    );
    return category.data;
  } catch (error) {
    console.log("Can't delete category", error);
  }
};
