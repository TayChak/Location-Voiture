import axios from 'axios'

const apiurl = 'http://localhost:5000/users'


//crud 
export async function getAllUsers() {
    return await axios.get(`${apiurl}/getAllUsers`)
}
export async function deleteUserById(id) {
    return await axios.delete(`${apiurl}/deleteUserById/${id}`)
}
