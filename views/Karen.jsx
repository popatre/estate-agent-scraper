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

                setListings(formattedArray);
                setLoading(false);
            }
        );
    };

    return (
        <section>
            <Button
                nameOfAgent="Karen Potter"
                scrapeFunc={getKarensListings}
                clicked={clicked}
                setClicked={setClicked}
                setListings={setListings}
            />
            {loading ? (
                <p>Getting listings from Karen's site</p>
            ) : (
                <div>
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
