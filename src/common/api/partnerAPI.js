import axios from "axios";

export const getAllPartners = async () => {
  try {
    const partners = await axios.get(
      `${import.meta.env.VITE_TWIN_API}/partner`
    );
    return partners.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const createPartner = async (payload) => {
  try {
    const newPartner = await axios.post(
      `${import.meta.env.VITE_TWIN_API}/partner/add`,
      payload
    );
    return newPartner.data.data;
  } catch (error) {
    console.log("Can't create category", error);
  }
};

export const deletePartner = async (payload) => {
  try {
    const partner = await axios.delete(
      `${import.meta.env.VITE_TWIN_API}/partner/delete/${payload}`
    );
    return partner.data.data;
  } catch (error) {
    console.log("Can't delete category", error);
  }
};
