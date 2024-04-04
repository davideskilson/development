import "./BookItem.css";

export default function BookItem(props) {
  const alt = "The book" + props.item.title;
  let isFavorite;
  if (props.favorites) {
    isFavorite = props.favorites.includes(props.item.title);
  } else {
    isFavorite = false;
  }
  return (
    <div className="book">
      <h3>Title: {props.item.title}</h3>
      <p>
        <b>Author: </b>
        {props.item.author}
      </p>
      <p>
        <b>Genre:</b> {props.item.genre}
      </p>
      <p>
        <b>Word Count: </b>
        {props.item.word_count} words
      </p>

      <img src={props.item.image} alt={alt}></img>

      {!isFavorite ? (
        <button onClick={() => props.addToFavorites(props.item.title)}>
          Add to Favorites
        </button>
      ) : (
        <button onClick={() => props.removeFromFavorites(props.item.title)}>
          Remove from Favorites
        </button>
      )}
    </div>
  );
}
