import axios from "axios";

const tsbFetch = axios.create({
    baseURL: "https://torfresma-api-client.herokuapp.com",
    headers: {
        "Content-Type": "application/json"
    }
})

export default tsbFetch;