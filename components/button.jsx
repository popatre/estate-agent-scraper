export default function Button({
    nameOfAgent,
    scrapeFunc,
    clicked,
    setClicked,
    setListings,
}) {
    const handleClick = () => {
        scrapeFunc();
        setClicked(!clicked);
    };

    const handleOtherClick = () => {
        setClicked(!clicked);
        setListings([]);
    };

    return !clicked ? (
        <button className="agent-btn" onClick={handleClick}>
            Listings from {nameOfAgent}
        </button>
    ) : (
        <button className="agent-btn" onClick={handleOtherClick}>
            Hide Listings
        </button>
    );
}
