import api from "./api";

export const getServicos = async () => {
  try {
    return await api.get("servico/all");
  } catch (error) {
    console.log(error.message);
  }
};
