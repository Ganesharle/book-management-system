import { useEffect, useState } from "react";

const BookForm = ({ onSubmit, editingBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    setFormData({
      title: "",
      author: "",
      genre: "",
      year: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <input
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />

      <input
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {editingBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;