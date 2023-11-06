import axios from "axios";

const instanceAPI = axios.create({
    baseURL: `${import.meta.env.VITE_URL}`,
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
});

export { instanceAPI };