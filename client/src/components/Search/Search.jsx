import { useState } from "react";
import { searchUser } from "../../actions/user";
import User from "../Sidebar/User";
import shortid from "shortid";
import styles from "./Search.module.css";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchStarted, setIsSearchStarted] = useState(false);

  return (
    <div onClick={() => setIsSearchStarted(false)}>
      <input
        onChange={async (e) => {
          setSearchQuery(e.target.value);
          const result = await searchUser(e.target.value);
          setSearchResult(result.data);
          setIsSearchStarted(true);
        }}
        className={
          isSearchStarted
            ? styles.searchInput
            : `${styles.searchInput} ${styles.inactive}`
        }
        type="text"
        placeholder="Search"
        value={searchQuery}
      />
      {isSearchStarted ? (
        <div>
          <div
            className={styles.searchResult}
            onClick={(e) => e.stopPropagation()}
          >
            {searchResult.length ? (
              searchResult.map((person) => (
                <User user={person} key={shortid.generate()} />
              ))
            ) : (
              <div className={styles.noResults}>No results</div>
            )}
          </div>
          <div className={styles.searchContainer}></div>
        </div>
      ) : null}
    </div>
  );
}

export default Search;
