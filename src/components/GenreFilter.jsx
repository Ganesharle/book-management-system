const GenreFilter = ({ books, setGenre }) => {
  const genres = [...new Set(books.map((book) => book.genre))];

  return (
    <select onChange={(e) => setGenre(e.target.value)}>
      <option value="">All Genres</option>

      {genres.map((genre, index) => (
        <option key={index} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter;