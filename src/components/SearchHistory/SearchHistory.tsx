import React, { useContext } from "react";

import { HomeContext } from "context/HomeContext";
import SearchIcon from "images/search.svg";
import RemoveIcon from "images/delete.svg";
import "./SearchHistory.css";

const SearchHistory = () => {
  const { searchHistory, removeSearchHistory, getWeather } =
    useContext(HomeContext);

  return (
    <div>
      <h2> Search History </h2>

      {/* Table  */}
      {!!searchHistory?.length ? (
        <ul className="search-history-container">
          {searchHistory.map((item) => {
            return (
              <li className="search-history-row-container" key={item.id}>
                <div className="search-history-row">
                  <span className="search-history-text">
                    {item.city}, {item.country}
                  </span>

                  <div className="search-history-action">
                    <span> {item.time} </span>
                    <div
                      className="search-history-icon"
                      onClick={() =>
                        getWeather(
                          {
                            city: item.city,
                            country: item.country,
                          },
                          true
                        )
                      }
                    >
                      <img src={SearchIcon} alt="search" />
                    </div>
                    <div
                      className="search-history-icon"
                      onClick={() => removeSearchHistory(item.id)}
                    >
                      <img src={RemoveIcon} alt="remove" />{" "}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="search-history-no-record">No Record</div>
      )}
    </div>
  );
};

export default React.memo(SearchHistory);
