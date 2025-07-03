import api from "./api";

export const getTestemunhos = async () => {
  try {
    return await api.get("/testemunhos");
  } catch (error) {
    console.log(error.message);
  }
};
export const createTestemunho = async (data) => {
  try {
    return await api.post("testemunhos/save", data);
  } catch (error) {
    console.log(error.message);
  }
};
