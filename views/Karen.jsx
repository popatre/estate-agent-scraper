import Button from "../components/button";
import { getListings } from "../apiCalls/api";
import { useState } from "react";
import { Circles } from "react-loader-spinner";

export default function Karen({}) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);

    const url = "https://estate-scraper0404.herokuapp.com/api/karen";

    const getKarensListings = () => {
        setLoading(true);
        getListings(url).then((currentListings) => {
            const formattedArray = [];

            for (let i = 0; i < currentListings.length; i += 2) {
                const formattedString = `${currentListings[i]} - ${
                    currentListings[i + 1]
                }`;
                formattedArray.push(formattedString);
            }

            let filtered = formattedArray.filter((item) => {
                return !item.includes("Sold");
            });
            filtered.length === 0 ? (filtered = ["No listings"]) : null;
            setListings(filtered);
            setLoading(false);
        });
    };

    return (
        <section className="container">
            <Button
                nameOfAgent="Karen Potter"
                scrapeFunc={getKarensListings}
                clicked={clicked}
                setClicked={setClicked}
                setListings={setListings}
            />
            <a href="https://www.karenpotter.co.uk/Search?listingType=5&category=1&statusids=1%2C3%2C4%2C9%2C10%2C16&obc=Price&obd=Descending&areainformation=4&radius=1609&minprice=&maxprice=150000&bedrooms=&dbsids=&perpage=21&page=1">
                Website
            </a>
            {loading ? (
                <Circles
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass
                />
            ) : (
                <div className="listings">
                    <ul>
                        {listings.map((house) => {
                            return <li>{house}</li>;
                        })}
                    </ul>
                </div>
            )}
        </section>
    );
}
