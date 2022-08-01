import Button from "../components/button";
import { getListings } from "../apiCalls/api";
import { useState } from "react";
import { Circles } from "react-loader-spinner";

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function KarlTatler({}) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);

    const url =
        process.env.NODE_ENV === "production"
            ? "https://estate-agent-scraper.vercel.app/api/karlTatler"
            : "http://localhost:3000/api/karlTatler";

    const getKarlsListings = () => {
        setLoading(true);
        return getListings(url).then((currListings) => {
            const formattedListings = currListings.map((item) => {
                const [location, price] = item.split("%");
                return { location, price };
            });
            setListings(formattedListings);
            setLoading(false);
        });
    };

    return (
        <section className="container">
            <Button
                nameOfAgent="Karl tatler"
                scrapeFunc={getKarlsListings}
                clicked={clicked}
                setClicked={setClicked}
                setListings={setListings}
            />
            <a href="https://www.karltatler.com/merseyside/wirral/sales/tag-house/from-0-bed/from-20000/up-to-130000/most-recent-first">
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
                        {listings.map((house, index) => {
                            if (index === 0) return;
                            const postcode =
                                house.location.match(
                                    /CH46|CH45|CH49|CH47|CH62|CH47/g
                                ) || [];
                            console.log(postcode, "***");
                            return (
                                <li>
                                    {[
                                        "CH46",
                                        "CH45",
                                        "CH49",
                                        "CH47",
                                        "CH62",
                                        "CH47",
                                    ].includes(postcode[0]) ? (
                                        <h3 style={{ color: "green" }}>
                                            {house.location}
                                        </h3>
                                    ) : (
                                        <h3>{house.location}</h3>
                                    )}

                                    <p>{house.price}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </section>
    );
}
