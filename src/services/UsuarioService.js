import api from "./api";

export const getUser = async () => {
  try {
    return await api.get("user/all");
  } catch (error) {
    console.log(error.message);
  }
};
export const createUser = async (data) => {
  try {
    return await api.post("user/signup", data);
  } catch (error) {
    console.log(error.message);
  }
};
// 
export const createSession = async (data) => {
  try {
    return await api.post("user/signin", data);
  } catch (error) {
    console.log(error.message);
  }
};
// 
export const getUserUserId = async (userId) => {
  try {
    return await api.get(`user/${userId}`);
  } catch (error) {
    console.log(error.message);
  }
};
export const getPerfilUserIdRelacionados = async (userId) => {
  try {
    return await api.get(`perfiluser/usuario/${userId}`);
  } catch (error) {
    console.log(error.message);
  }
};


export const salvePerfil = async (data) => {
  try {
    return await api.post("perfiluser/salve", data);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPerfil = async (data) => {
  try {
    return await api.post("perfiluser/create", data);
  } catch (error) {
    console.log(error.message);
  }
};
export const getPerfilUserId = async (perfiUserId) => {
  try {
    return await api.get(`perfiluser/${perfiUserId}`);
  } catch (error) {
    console.log(error.message);
  }
};

