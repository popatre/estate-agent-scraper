import { getListings } from "./api";

export const getKarensListings = (setLoading, setListings) => {
    setLoading(true);
    getListings().then((currentListings) => {
        const formattedArray = [];

        for (let i = 0; i < currentListings.length; i += 2) {
            const formattedString = `${currentListings[i]} - ${
                currentListings[i + 1]
            }`;
            formattedArray.push(formattedString);
        }

        setListings(formattedArray);
        setLoading(false);
    });
};
