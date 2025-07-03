import api from "./api";

export const getContactos = async () => {
  try {
    return await api.get("contacto/all");
  } catch (error) {
    console.log(error.message);
  }
};
export const createContacto = async (data) => {
  try {
    return await api.post("contacto/salve", data);
  } catch (error) {
    console.log(error.message);
  }
};
export const getContactoid = async (id) => {
  try {
    return await api.get(`contacto/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};
export const updateContacto = async (id, data) => {
  try {
    return await api.put(`contacto/${id}`, data);
  } catch (error) {
    console.log(error.message);
  }
};
export const removeContacto = async (id) => {
  try {
    return await api.delete(`contacto/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};
