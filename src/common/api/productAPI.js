import axios from "axios";

export const getAllProductAPI = async () => {
  try {
    const products = await axios.get(
      `${import.meta.env.VITE_TWIN_API}/product`
    );
    return products.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const getProductByIdAPI = async (id) => {
  try {
    const product = await axios.get(
      `${import.meta.env.VITE_TWIN_API}/product/find/${id}`
    );
    // const product = await axios.get(
    //   `${import.meta.env.VITE_DEV_API}/product/find/${id}`
    // );
    return product.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const createProductAPI = async (payload) => {
  try {
    const newProduct = await axios.post(
      `${import.meta.env.VITE_TWIN_API}/product/add`,
      payload
    );
    // const newProduct = await axios.post(
    //   `${import.meta.env.VITE_DEV_API}/product/add`,
    //   payload
    // );
    return newProduct.data;
  } catch (error) {
    console.log("Can't create product", error);
  }
};

export const updateProductAPI = async (payload) => {
  try {
    const product = await axios.put(
      `${import.meta.env.VITE_TWIN_API}/product/edit/${payload._id}`,
      payload
    );
    return product.data;
  } catch (error) {
    console.log("Can't update product", error);
  }
};

export const deleteProductAPI = async (payload) => {
  try {
    const product = await axios.delete(
      `${import.meta.env.VITE_TWIN_API}/product/delete/${payload._id}`
    );
    return product.data;
  } catch (error) {
    console.log("Can't delete product", error);
  }
};
