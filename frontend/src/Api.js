//Api.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data || [];
  } catch (error) {
    throw new Error(`Erro ao buscar clientes: ${error.message}`);
  }
};

export const fetchClient = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    return response.data || {};
  } catch (error) {
    throw new Error(`Erro ao buscar cliente: ${error.message}`);
  }
};

export const addClient = async (newClient) => {
  try {
    const response = await axios.post(`${API_URL}/clients`, newClient);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao adicionar cliente: ${error.message}`);
  }
};

export const editClient = async (id, newData) => {
  try {
    await axios.put(`${API_URL}/clients/${id}`, newData);
  } catch (error) {
    throw new Error(`Erro ao atualizar cliente: ${error.message}`);
  }
};

export const deleteClient = async (id) => {
  try {
    await axios.delete(`${API_URL}/clients/${id}`);
  } catch (error) {
    throw new Error(`Erro ao excluir cliente: ${error.message}`);
  }
};
