import axios from "axios";

const instanceAPI = axios.create({
    baseURL: `${import.meta.env.VITE_URL}`,
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 2000
});

export { instanceAPI };