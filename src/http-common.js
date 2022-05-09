import axios from "axios";

export default axios.create({
    baseURL: "https://dentyx-reviews.herokuapp.com/api/v1/reviews",
    headers: {
        "Content-type": "application/json"
    }
})