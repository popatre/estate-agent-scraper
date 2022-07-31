import Button from "../components/button";
import { getListings } from "../apiCalls/api";
import { useState } from "react";

export default function Karen({}) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);

    const getKarensListings = () => {
        setLoading(true);
        getListings("http://localhost:3000/api/karen").then(
            (currentListings) => {
                const formattedArray = [];

                for (let i = 0; i < currentListings.length; i += 2) {
                    const formattedString = `${currentListings[i]} - ${
                        currentListings[i + 1]
                    }`;
                    formattedArray.push(formattedString);
                }

                const filtered = formattedArray.filter((item) => {
                    return !item.includes("Sold");
                });

                setListings(filtered);
                setLoading(false);
            }
        );
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
                <p>Getting listings from Karen's site</p>
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
