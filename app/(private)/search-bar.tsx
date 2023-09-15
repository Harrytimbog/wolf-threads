import * as _ from "lodash";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import User from "../components/user";

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(e.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchSearchResults = async (searchText: string) => {
    const res = await fetch("/api/search?q=" + searchText);

    if (res.ok) {
      const json = await res.json();
      console.log(json);
      setVisible(true);
      setSearchResults(json.data);
    } else {
      setSearchResults([]);
      setVisible(false);
    }
  };

  const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("change", e.target.value);
    debouncedFetchSearchResults(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setVisible(true);
  };

  return (
    <div
      className="flex flex-row max-w-md w-full justify-end relative"
      ref={ref}
    >
      <input
        onChange={handleChange}
        onClick={handleClick}
        type="text"
        className="p-2 rounded-lg bg-gray-700 my-2 max-w-xs"
        placeholder="Search"
      />
      {visible && searchResults.length > 0 && (
        <ul className="flex flex-col bg-gray-700 absolute p-2 rounded-lg top-14 w-full max-w-sm right-2">
          {searchResults.map((result: UserI) => {
            return (
              <li
                key={result.id}
                className="my-3"
                onClick={() => setVisible(false)}
              >
                <User user={result} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
