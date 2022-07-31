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
        <button onClick={handleClick}>Listings from {nameOfAgent}</button>
    ) : (
        <button onClick={handleOtherClick}>Hide Listings</button>
    );
}
