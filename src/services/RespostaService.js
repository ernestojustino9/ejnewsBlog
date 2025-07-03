import api from "./api";

export const getRespostas = async () => {
  try {
    return await api.get("resposta/all");
  } catch (error) {
    console.log(error.message);
  }
};

export const getRespostasId = async (id) => {
  try {
    return await api.get(`resposta/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRespostaComentarioSlug = async (slug) => {
  try {
    return await api.get(`resposta/${slug}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRespostaComentarioId = async (comentarioId) => {
  try {
    return await api.get(`resposta/comentario/${comentarioId}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const createRespostas = async (data) => {
  try {
    return await api.post("resposta/cadastrar", data);
  } catch (error) {
    console.log(error.message);
  }
};

