import api from "./api";

export const getCategoriaNoticias = async () => {
  try {
    return await api.get("categorianoticia/all");
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategoriaNoticiaId = async (id) => {
  try {
    return await api.get(`categorianoticia/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategoriaNoticiaSlug = async (slug) => {
  try {
    return await api.get(`categorianoticia/${slug}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMunicipiosProvincia = async (id) => {
  try {
    return await api.get("/municipios?provinciaId=" + id);
  } catch (error) {
    console.log(error.message);
  }
};