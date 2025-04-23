import axios from 'axios'

const apiurl = 'http://localhost:5000/clients'


//crud 
export async function getAllClients() {
    return await axios.get(`${apiurl}/getAllClients`)
}
export async function deleteClientById(id) {
    return await axios.delete(`${apiurl}/deleteClientById/${id}`)}