import axios from "axios";

export const getAllPartnersAPI = async () => {
  try {
    const partners = await axios.get(
      `${import.meta.env.VITE_TWIN_API}/partner`
    );
    return partners.data.data;
  } catch (error) {
    console.log("error warning up app", error);
  }
};

export const createPartnerAPI = async (payload) => {
  try {
    const newPartner = await axios.post(
      `${import.meta.env.VITE_TWIN_API}/partner/add`,
      payload
    );
    // const newPartner = await axios.post(
    //   `${import.meta.env.VITE_DEV_API}/partner/add`,
    //   payload
    // );
    return newPartner.data;
  } catch (error) {
    console.log("Can't create category", error);
  }
};

export const deletePartnerAPI = async (payload) => {
  try {
    const partner = await axios.delete(
      `${import.meta.env.VITE_TWIN_API}/partner/delete/${payload}`
    );
    return partner.data;
  } catch (error) {
    console.log("Can't delete category", error);
  }
};
