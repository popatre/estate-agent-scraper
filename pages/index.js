import ChrisTins from "../views/ChrisTins";
import Karen from "../views/Karen";
export default function Home() {
    return (
        <main>
            <h1 className="title">Listings Scraper</h1>
            <Karen />
            <ChrisTins />
        </main>
    );
}
