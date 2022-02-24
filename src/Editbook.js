import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";
import { API } from "./global";
import { bookValidationSchema } from "./Addbook";
import { useFormik } from "formik";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export function Editbook() {
  const { id } = useParams();
  //console.log(id);
  const [book, setBook] = useState(null);

  // CRUD - Read -  GET operation is performed here
  useEffect(() => {
    fetch(`${API}/books/${id}`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((bks) => setBook(bks))
      .catch((err) => console.log(err));
  }, []);

  return <div>{book ? <UpdateBook book={book} /> : <h2>Loading</h2>}</div>;
}

function UpdateBook({ book }) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: book.name,
      poster: book.poster,
      author: book.author,
      summary: book.summary,
      year: book.year,
      info: book.info,
    },
    validationSchema: bookValidationSchema,
    onSubmit: (UpdatedBook) => {
      editBook(UpdatedBook);
    },
  });

  // CRUD - Update -  POST operation is performed here
  const editBook = (UpdatedBook) => {
    console.log("Updated", UpdatedBook);
    fetch(`${API}/books/${book.id}`, {
      method: "PUT",
      body: JSON.stringify(UpdatedBook),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/books"));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="input">
      <h1 style={{ color: "green" }}>
        <MenuBookIcon /> Here you can edit your Favourite Books
      </h1>
      <TextField
        className="text"
        label="Book Name"
        variant="outlined"
        margin="dense"
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        helperText={
          formik.touched.name && formik.errors.name ? formik.errors.name : ""
        }
      />
      <TextField
        className="text"
        label="Poster"
        variant="outlined"
        margin="dense"
        id="poster"
        name="poster"
        onChange={formik.handleChange}
        value={formik.values.poster}
        onBlur={formik.handleBlur}
        error={formik.touched.poster && formik.errors.poster}
        helperText={
          formik.touched.poster && formik.errors.poster
            ? formik.errors.poster
            : ""
        }
      />
      <TextField
        className="text"
        label="Author"
        variant="outlined"
        margin="dense"
        id="author"
        name="author"
        onChange={formik.handleChange}
        value={formik.values.author}
        onBlur={formik.handleBlur}
        error={formik.touched.author && formik.errors.author}
        helperText={
          formik.touched.author && formik.errors.author
            ? formik.errors.author
            : ""
        }
      />
      <TextField
        className="text"
        label="Publish year"
        variant="outlined"
        margin="dense"
        id="year"
        name="year"
        onChange={formik.handleChange}
        value={formik.values.year}
        onBlur={formik.handleBlur}
        error={formik.touched.year && formik.errors.year}
        helperText={
          formik.touched.year && formik.errors.year ? formik.errors.year : ""
        }
      />
      <TextField
        className="text"
        label="Summary"
        variant="outlined"
        margin="dense"
        id="summary"
        name="summary"
        onChange={formik.handleChange}
        value={formik.values.summary}
        onBlur={formik.handleBlur}
        error={formik.touched.summary && formik.errors.summary}
        helperText={
          formik.touched.summary && formik.errors.summary
            ? formik.errors.summary
            : ""
        }
      />
      <TextField
        className="text"
        label="Info"
        variant="outlined"
        margin="dense"
        id="info"
        name="info"
        onChange={formik.handleChange}
        value={formik.values.info}
        onBlur={formik.handleBlur}
        error={formik.touched.info && formik.errors.info}
        helperText={
          formik.touched.info && formik.errors.info ? formik.errors.info : ""
        }
      />
      <Button variant="contained" type="submit">
        Update Book
      </Button>
    </form>
  );
}
