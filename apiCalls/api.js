import axios from "axios";

export const getListings = (url) => {
    return axios.get(url).then((res) => {
        return res.data.listings;
    });
};
