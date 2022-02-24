import { BookCard } from "./BookCard";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "./global";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export function Booklist() {
  const history = useHistory();

  const [booklist, setBooklist] = useState([]);

  // CRUD - Read -  GET operation is performed here

  const getBooks = () => {
    fetch(`${API}/books`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((mvs) => setBooklist(mvs));
  };
  useEffect(() => getBooks(), []);

  // CRUD - Delete -  DELETE operation is performed here
  const deleteBook = (id) => {
    fetch(`${API}/books/${id}`, {
      method: "DELETE",
    }).then(() => getBooks());
  };

  return (
    <div>
      <h1 className="head">
        <LibraryBooksIcon /> Motivational Books Mini Library
      </h1>
      <div className="list">
        {booklist.map(
          ({ name, poster, author, id, year, info, summary }, index) => (
            <BookCard
              key={index}
              //{...user}
              name={name}
              id={id}
              poster={poster}
              author={author}
              year={year}
              summary={summary}
              info={info}
              deletebutton={
                <IconButton
                  style={{ marginLeft: "auto" }}
                  color="error"
                  onClick={() => {
                    deleteBook(id);
                    console.log(id);
                  }}
                  aria-label="delete"
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              }
              editbutton={
                <IconButton
                  color="secondary"
                  onClick={() => history.push(`/books/edit/${id}`)}
                  aria-label="edit"
                  size="medium"
                >
                  <EditIcon />
                </IconButton>
              }
            />
          )
        )}
      </div>
    </div>
  );
}
