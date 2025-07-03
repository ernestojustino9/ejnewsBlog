import api from "./api";

export const getSobres = async () => {
  try {
    return await api.get("sobre/all");
  } catch (error) {
    console.log(error.message);
  }
};
