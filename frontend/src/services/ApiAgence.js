import axios from 'axios'

const apiurl = 'http://localhost:5000/agences'


//crud 
export async function getAllAgences() {
    return await axios.get(`${apiurl}/getAllAgences`)
}
export async function deleteAgenceById(id) {
    return await axios.delete(`${apiurl}/deleteAgenceById/${id}`)
}
export async function addagence(AgenceData) {
    return await axios.post(`${apiurl}/addagence`,AgenceData, {
    });
}
