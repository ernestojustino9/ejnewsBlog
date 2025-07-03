import api from "./api";

export const getCategorias = async () => {
  try {
    return await api.get("categoria/listar");
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategoriaNoticiaId = async (categoriaId) => {
  try {
    return await api.get(`categoria/${categoriaId}`);
  } catch (error) {
    console.log(error.message);
  }
};