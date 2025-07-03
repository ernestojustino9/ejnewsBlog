import api from "./api";

export const getBanners = async () => {
  try {
    return await api.get("banner/all");
  } catch (error) {
    console.log(error.message);
  }
};
