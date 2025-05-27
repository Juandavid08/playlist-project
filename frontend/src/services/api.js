import axios from 'axios';

const baseURL = 'http://localhost:8080';

// Crear una nueva lista de reproducción
export const createPlaylist = async (playlistData) => {
  const response = await axios.post(`${baseURL}/lists`, playlistData);
  return response.data;
};

// Eliminar una lista por nombre
export const deletePlaylist = async (nombre) => {
  const response = await axios.delete(`${baseURL}/lists/${nombre}`);
  return response.data;
};

// Obtener todas las listas (solo devuelve el array, no el mensaje)
export const getAllPlaylists = async () => {
  const response = await axios.get(`${baseURL}/lists`);
  return response.data.listas;
};
