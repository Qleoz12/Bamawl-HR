import axios from 'axios';
const API = () => {
    // Create instance
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_ERP_URL
    })    

    return instance;
};

export default API();