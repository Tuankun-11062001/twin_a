import axios from "axios";

export const getAllBlogAPI = async () => {
  try {
    const getBlogAPIs = await axios.get(
      `${import.meta.env.VITE_TWIN_API}/blog`
    );
    return getBlogAPIs.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const getBlogAPI = async (id) => {
  try {
    const getBlogAPIs = await axios.get(
      `${import.meta.env.VITE_TWIN_API}/blog/find/${id}`
    );
    return getBlogAPIs.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const createBlogAPI = async (payload) => {
  try {
    const newBlog = await axios.post(
      `${import.meta.env.VITE_TWIN_API}/blog/add`,
      payload
    );
    return newBlog.data;
  } catch (error) {
    console.log("Can't create blog", error);
  }
};

export const editBlogAPI = async (payload) => {
  try {
    const newBlog = await axios.put(
      `${import.meta.env.VITE_TWIN_API}/blog/edit/${payload._id}`,
      payload
    );
    return newBlog.data;
  } catch (error) {
    console.log("Can't edit blog", error);
  }
};

export const deleteBlogAPI = async (payload) => {
  try {
    const blog = await axios.delete(
      `${import.meta.env.VITE_TWIN_API}/blog/delete/${payload}`
    );
    return blog.data;
  } catch (error) {
    console.log("Can't delete blog", error);
  }
};
