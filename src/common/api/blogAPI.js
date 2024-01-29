import axios from "axios";

export const getAllBlog = async () => {
  try {
    const getBlogs = await axios.get(`${import.meta.env.VITE_TWIN_API}/blog`);
    return getBlogs.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const getBlog = async (id) => {
  try {
    const getBlogs = await axios.get(
      `${import.meta.env.VITE_TWIN_API}/blog/find/${id}`
    );
    return getBlogs.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const createBlog = async (payload) => {
  try {
    const newBlog = await axios.post(
      `${import.meta.env.VITE_TWIN_API}/blog/add`,
      payload
    );
    return newBlog.data.data;
  } catch (error) {
    console.log("Can't create category", error);
  }
};

export const deleteBlog = async (payload) => {
  try {
    const category = await axios.delete(
      `${import.meta.env.VITE_TWIN_API}/blog/delete/${payload}`
    );
    return category.data.data;
  } catch (error) {
    console.log("Can't delete category", error);
  }
};
