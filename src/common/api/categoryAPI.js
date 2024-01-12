import axios from "axios";

export const getAllCategories = async () => {
  try {
    const getCategories = await axios.get(
      `${import.meta.env.VITE_TWIN_API}/category`
    );
    return getCategories.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const createCategory = async (payload) => {
  try {
    const newCategory = await axios.post(
      `${import.meta.env.VITE_TWIN_API}/category/add`,
      payload
    );
    return newCategory.data.data;
  } catch (error) {
    console.log("Can't create category", error);
  }
};
