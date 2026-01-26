import axios from "./axios";


export const registerAuth = async (name, email, password) => {
    try {
        const response = await axios.post('/auth/register', { name, email, password })
        return response.data
    }
    catch (error) {
        return error?.response.data
    }
}

export const loginAuth = async (email, password) => {
    try {
        const response = await axios.post('/auth/login', { email, password })
        return response.data

    } catch (error) {
        return error?.response.data
    }
}

export const logoutAuth = async () => {
    try {
        const response = await axios.post("/auth/logout")
        return response.data
    } catch (error) {
        return error?.response.data
    }
}


export const isAuthenticated = async () => {
    try {
        const response = await axios.get("/user");
        return response.data
    } catch (error) {
        return error?.response.data 
    }

}
