import Button from "../components/button";
import { getListings } from "../apiCalls/api";
import { useState } from "react";

export default function ChrisTins({}) {
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [clicked, setClicked] = useState(false);

    const url =
        process.env.NODE_ENV === "production"
            ? "https://estate-agent-scraper.vercel.app/api/chrisTin"
            : "http://localhost:3000/api/chrisTin";

    const getChrisListings = () => {
        setLoading(true);
        return getListings(url).then((currListings) => {
            const filtered = currListings.filter((item) => {
                return (
                    !item.includes("Sold") &&
                    !item.includes("flat") &&
                    !item.includes("Flat")
                );
            });

            const formattedListings = filtered.map((item) => {
                const [title, price, desc, location] = item.split("%");
                return { title, price, desc, location };
            });
            setListings(formattedListings);
            setLoading(false);
        });
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
            <a href="https://www.christinsley.co.uk/merseyside/birkdale/sales/up-to-150000/within-0-25-miles">
                Website
            </a>
            {loading ? (
                <p>Getting listings from Chris's site</p>
            ) : (
                <div className="listings">
                    <ul>
                        {listings.map((house) => {
                            return (
                                <li>
                                    <h2>{house.title}</h2>
                                    <p>{house.price}</p>
                                    <p>{house.desc}</p>
                                    <p>{house.location}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </section>
    );
}
