import { useParams, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState, useEffect } from "react";
import { API } from "./global";

export function Bookdetails() {
  const { id } = useParams();
  console.log(id);
  const [book, setBook] = useState([]);

     //useEffect is implemented here
     //CRUD - Read - Get is executed here
  useEffect(() => {
    fetch(`${API}/books/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((bks) => setBook(bks))
      .catch((err) => console.log(err));
  });
  const history = useHistory();
  return (
    <div>
      <h1>Buy Book Information</h1>

      <img className="book" src={book.poster} alt={book.name} />

      <div className="book-container">
        <h2>
          {book.name}
          <Button variant="contained" href={book.buy} target="_blank">
            Buy Now
          </Button>
        </h2>
        <p>
          <b>Author : </b>
          {book.author}
        </p>
        <p>
          <b>Information:</b>
          {book.info}
        </p>

        <Button
          onClick={() => {
            history.goBack();
          }}
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
