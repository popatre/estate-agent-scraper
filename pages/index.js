import ChrisTins from "../views/ChrisTins";
import Karen from "../views/Karen";
import KarlTatler from "../views/KarlTatler";
export default function Home() {
    return (
        <main>
            <h1 className="title">Listings Scraper</h1>
            <Karen />
            <ChrisTins />
            <KarlTatler />
        </main>
    );
}
