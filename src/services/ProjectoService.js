import api from "./api";

export const getProjectos = async () => {
  try {
    return await api.get("projecto/all");
  } catch (error) {
    console.log(error.message);
  }
};
