import axios from "axios"

const axiosClient = axios.create({
    baseURL: "http://localhost:3000/financial-control"
})

export async function getAllClients(params: any) {

    try {
        const { data } = await axiosClient.get('/search', {
            params
        })

        return data
    } catch(error) {

        return {
            status: 500,
            data: []
        }

    }

}