import api from "./api";

export const getSkills = async () => {
  try {
    return await api.get("skill/all");
  } catch (error) {
    console.log(error.message);
  }
};
