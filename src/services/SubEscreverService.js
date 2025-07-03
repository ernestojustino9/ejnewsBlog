import api from "./api";


export const createSubescerver = async (data) => {
  try {
    return await api.post("subescrever/salve", data);
  } catch (error) {
    console.log(error.message);
  }
};

