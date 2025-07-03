import api from "./api";

export const getComentarios = async () => {
  try {
    return await api.get("comentario/listar");
  } catch (error) {
    console.log(error.message);
  }
};
export const getComentarioId = async (id) => {
  try {
    return await api.get(`comentario/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getComentarioNoticiaId = async (noticiaId) => {
  try {
    return await api.get(`comentario/noticia/${noticiaId}`);
  } catch (error) {
    console.log(error.message);
  }
};
export const getComentarioNoticiaSlug = async (slug) => {
  try {
    return await api.get(`comentario/noticiaSlug/${slug}`);
  } catch (error) {
    console.log(error.message);
  }
};

// export const getComentarioSlug = async (slug) => {
//   try {
//     return await api.get(`comentario/${slug}`);
//   } catch (error) {
//     console.log(error.message);
//   }
// };



export const createComentario = async (data) => {
  try {
    return await api.post("comentario/cadastrar", data);
  } catch (error) {
    console.log(error.message);
  }
};
