import axios from "axios";

const API_URL = "https://6a1490d66c7db8aac054ba36.mockapi.io/book";

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBook = async (book) => {
  const response = await axios.post(API_URL, {
    title: book.title,
    author: book.author,
    genre: book.genre,
    year: book.year,
  });

  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await axios.put(`${API_URL}/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};