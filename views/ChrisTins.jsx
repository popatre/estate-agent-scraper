import Button from "../components/button";
import { getListings } from "../apiCalls/api";
import { useState } from "react";

export default function ChrisTins({}) {
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [clicked, setClicked] = useState(false);

    const getChrisListings = () => {
        setLoading(true);
        return getListings("http://localhost:3000/api/chrisTin").then(
            (currListings) => {
                setListings(currListings);
                setLoading(false);
            }
        );
    };

    return (
        <section className="container">
            <Button
                nameOfAgent="Chris Tinsley"
                scrapeFunc={getChrisListings}
                clicked={clicked}
                setClicked={setClicked}
                setListings={setListings}
            />
            {loading ? (
                <p>Getting listings from Chris's site</p>
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
