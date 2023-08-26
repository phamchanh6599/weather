import SearchForm from "components/SearchForm/SearchForm";
import SearchResult from "components/SearchResult/SearchResult";
import SearchHistory from "components/SearchHistory/SearchHistory";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title"> TODAY'S WEATHER</h1>

      {/* Form for user to search  */}
      <SearchForm />

      {/* Display information  */}
      <div className="home-search-result-container">
        <SearchResult />
      </div>

      {/* Search History  */}
      <div className="home-search-history-container">
        <SearchHistory />
      </div>
    </div>
  );
}

export default Home;
