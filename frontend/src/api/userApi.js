import axios from "./axios.js"


export const getUserAuth = async () => {
    try {
        const response = await axios.get(`/user`)
        return response.data;
    } catch (error) {
        return error?.response.data
    }

}

