import axios from 'axios';

const apiurl = 'http://localhost:5000/cars';

// CRUD operations
export async function getAllCars() {
  return await axios.get(`${apiurl}/getAllCars`);
}

export async function deleteCarById(id) {
  return await axios.delete(`${apiurl}/deleteCarById/${id}`);
}

export async function AddCar(carData) {
  return await axios.post(`${apiurl}/addCar`, carData);
}

export async function updateCar(carData, id) {
  // Si vous ne gérez pas de fichiers (pas besoin de 'multipart/form-data')
  return await axios.put(`${apiurl}/updateCar/${id}`, carData, {
    headers: {
      'Content-Type': 'application/json'  // Utilisez 'application/json' si vous ne travaillez pas avec des fichiers
    }
  });
}

export async function getCarById(id) {
  return await axios.get(`${apiurl}/getCarById/${id}`);
}
