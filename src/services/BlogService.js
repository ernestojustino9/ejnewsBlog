import api from "./api";

export const getNoticias = async () => {
  try {
    return await api.get("noticia/publicado");
  } catch (error) {
    console.log(error.message);
  }
};

export const getNoticiaRecentes = async () => {
  try {
    return await api.get(`noticia/recent/${3}`);
  } catch (error) {
    console.log(error.message);
  }
};


export const getNoticiaRelacionados = async (userId) => {
  try {
    // return await api.get("noticia/findNoticiaRelacionado");
    return await api.get(`noticia/usuario/${userId}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getNoticiaId = async (id) => {
  try {
    return await api.get(`noticia/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getNoticiasByCategoriaId = async (id) => {
  try {
    return await api.get("/noticia?categoriaId=" + id);
  } catch (error) {
    console.log(error.message);
  }
};

export const getNoticiaSlug = async (slug) => {
  try {
    return await api.get(`noticia/slug/${slug}`);
  } catch (error) {
    console.log(error.message);
  }
};




