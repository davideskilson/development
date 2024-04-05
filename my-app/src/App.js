import "./App.css";
import { useEffect, useState } from "react";
import bookData from "./assets/book-data.json";
import BookItem from "./components/BookItem";

function App() {
  const [data, setData] = useState(bookData);
  const [favorites, setFavorites] = useState([]);
  const [filterFeatures, setFilterFeatures] = useState(["All", "All"]);
  const [sort, setSort] = useState("No Sorting");

  const loadData = () => {
    setData(bookData);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterBooks(filterFeatures);
  }, [filterFeatures]);

  const addToFavorites = (item) => {
    if (favorites) {
      setFavorites((prev_favorites) =>
        Array.from(new Set([...prev_favorites, item]))
      );
    } else {
      setFavorites([item]);
    }
  };

  const removeFromFavorites = (item) => {
    setFavorites((prev_favorites) => {
      return prev_favorites.filter((anItem) => anItem != item);
    });
    console.log(favorites);
  };
  let data_copy = [...data];
  const buildElements = () => {
    if (data.length === 0) {
      return (
        <p>
          No books match your chosen combination of filter catagories. Please
          use other catagories to see book options.
        </p>
      );
    }
    let jsxlist;
    if (sort === "increasing") {
      jsxlist = data_copy
        .sort(
          (el_1, el_2) =>
            parseInt(el_1.word_count.replace(/,/g, "")) -
            parseInt(el_2.word_count.replace(/,/g, ""))
        )
        .map((item, index) => {
          return (
            <BookItem
              item={item}
              addToFavorites={addToFavorites}
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          );
        });
    } else if (sort === "decreasing") {
      jsxlist = data_copy
        .sort(
          (el_1, el_2) =>
            parseInt(el_2.word_count.replace(/,/g, "")) -
            parseInt(el_1.word_count.replace(/,/g, ""))
        )
        .map((item, index) => {
          return (
            <BookItem
              item={item}
              addToFavorites={addToFavorites}
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          );
        });
    } else {
      jsxlist = data.map((item, index) => {
        return (
          <BookItem
            item={item}
            addToFavorites={addToFavorites}
            favorites={favorites}
            removeFromFavorites={removeFromFavorites}
          />
        );
      });
    }

    return jsxlist;
  };

  const showBooks = () => {
    if (!favorites || favorites.length === 0) {
      console.log("No favorites chosen");
      return (
        <p>
          No favorites currently selected. Use the "Add to Favorites" button in
          the book cards below to add a book to your favorites list.
        </p>
      );
    }

    const jsxlist = favorites.map((book, index) => {
      return <p key={index}> {book}</p>;
    });

    return (
      <div>
        {jsxlist}
        <p>
          <b>Number of Favorite Books: </b> {favorites.length}
        </p>
      </div>
    );
  };

  const checkGenre = (book) => {
    return book.genre === filterFeatures[0];
  };

  const checkAuthor = (book) => {
    return book.author === filterFeatures[1];
  };

  const filterBooks = (new_filter) => {
    if (new_filter[0] === "All" && new_filter[1] === "All") {
      setData(bookData);
    } else if (new_filter[1] === "All") {
      setData(bookData.filter(checkGenre));
    } else if (new_filter[0] === "All") {
      setData(bookData.filter(checkAuthor));
    } else {
      const temp_data = bookData.filter(checkGenre);
      setData(temp_data.filter(checkAuthor));
    }
  };

  const handleChangeGenre = (event) => {
    const new_filter = [event.target.value, filterFeatures[1]];
    setFilterFeatures((prev_filter) => new_filter);
    if (new_filter[0] === "All" && new_filter[1] === "All") {
      setData(bookData);
    } else if (new_filter[1] === "All") {
      setData(bookData.filter(checkGenre));
    } else if (new_filter[0] === "All") {
      setData(bookData.filter(checkAuthor));
    } else {
      const temp_data = bookData.filter(checkGenre);
      setData(temp_data.filter(checkAuthor));
    }
  };

  const handleChangeAuthor = (event) => {
    const new_filter = [filterFeatures[0], event.target.value];
    setFilterFeatures((prev_filter) => new_filter);
    if (new_filter[0] === "All" && new_filter[1] === "All") {
      setData(bookData);
    } else if (new_filter[1] === "All") {
      setData(bookData.filter(checkGenre));
    } else if (new_filter[0] === "All") {
      setData(bookData.filter(checkAuthor));
    } else {
      const temp_data = bookData.filter(checkGenre);
      setData(temp_data.filter(checkAuthor));
    }
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="App">
      <section aria-label="title">
        <div role="banner">
          <h1>Book Favoriting</h1>
        </div>
      </section>
      <section role="main" aria-label="favorite books list">
        <div role="main" id="favorites">
          <h2>Favorites</h2>
          <div id="favoritesList">{showBooks()}</div>
        </div>
      </section>
      <section role="main" aria-label="list of books">
        <div role="main" id="bookListWrapper">
          <h2>List of Books</h2>
          <div id="filtersSortButtons">
            <div id="filtersAndSort">
              <div id="filters">
                <div className="aFiltering">
                  <label>
                    <p>
                      <b>Filter:</b> only see books belonging to the chosen
                      genre:
                    </p>
                    <select
                      value={filterFeatures[0]}
                      onChange={handleChangeGenre}
                    >
                      <option value="All">All</option>
                      <option value="Historical Fiction">
                        Historical Fiction
                      </option>
                      <option value="Mystery">Mystery</option>
                      <option value="Family Saga">Family Saga</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Children's Fiction">
                        Children's Fiction
                      </option>
                    </select>
                    {filterFeatures[0] === "All" ? (
                      <p>All genres of books included</p>
                    ) : (
                      <p>Filtering to only include {filterFeatures[0]} books</p>
                    )}
                  </label>
                </div>
                <div className="aFiltering">
                  <label>
                    <p>
                      <b>Filter:</b> only see books by the chosen author
                    </p>
                    <select
                      value={filterFeatures[1]}
                      onChange={handleChangeAuthor}
                    >
                      <option value="All">All</option>
                      <option value="Charles Dickens">Charles Dickens</option>
                      <option value="Agatha Christie">Agatha Christie</option>
                      <option value="Cao Xueqin">Cao Xueqin</option>
                      <option value="J. K. Rowling">J. K. Rowling</option>
                      <option value="Paulo Coelho">Paulo Coelho</option>
                      <option value="J. R. R. Tolkien">J. R. R. Tolkien</option>
                      <option value="Antoine de Saint-Exupéry">
                        Antoine de Saint-Exupéry
                      </option>
                      <option value="H. Rider Haggard">H. Rider Haggard</option>
                      <option value="Dan Brown">Dan Brown</option>{" "}
                    </select>
                    {filterFeatures[1] === "All" ? (
                      <p>Books written by all authors included</p>
                    ) : (
                      <p>
                        Filtering to only include books by {filterFeatures[1]}
                      </p>
                    )}
                  </label>
                </div>
              </div>
              <div className="aSorting">
                <label>
                  <p>
                    <b>Sort:</b> as you scroll down, have the word counts of the
                    books be in increasing or decreasing order.
                  </p>
                  <select value={sort} onChange={handleChangeSort}>
                    <option value="No Sorting">No Sorting</option>
                    <option value="increasing">Increasing</option>
                    <option value="decreasing">Decreasing</option>
                  </select>
                  {sort === "No Sorting" ? (
                    <p>No sorting applied to the books</p>
                  ) : (
                    <p>
                      Sorting books to have {sort} word counts as you scroll
                      down the page
                    </p>
                  )}
                </label>
              </div>
            </div>
            <button
              onClick={(event) => {
                setFilterFeatures(["All", "All"]);
                setSort("No Sorting");
              }}
            >
              Reset all Filtering and Sorting
            </button>
          </div>
          <div id="bookList">{buildElements()}</div>
        </div>
      </section>
    </div>
  );
}

export default App;
