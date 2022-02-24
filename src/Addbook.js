import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { API } from "./global";
import { useFormik } from "formik";
import * as yup from "yup";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export const bookValidationSchema = yup.object({
  name: yup.string().required("Why not fill this name? 😉"),
  poster: yup
    .string()
    .required("Why not fill this poster? 😉")
    .min(4, "Need a longer poster link 😄"),
  author: yup.string().required("Why not fill this author name? 😉"),
  summary: yup.string().required("Why not fill this summary? 😉").min(20),
  year: yup.number().required("Why not fill this published year? 😉").min(4),
  info: yup.string().required("Why not fill this info? 😉").min(20),
});

export function Addbook() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      author: "",
      summary: "",
      year: "",
      info: "",
    },
    validationSchema: bookValidationSchema,
    onSubmit: (newBook) => {
      addBook(newBook);
    },
  });

  // CRUD - create -  POST operation is performed here
  const addBook = (newBook) => {
    console.log("onSubmit", newBook);
    fetch(`${API}/books/`, {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/books"));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="input">
      <h1 style={{ color: "green" }}>
        <MenuBookIcon />
        Here you can add your Favourite Books{" "}
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
        Add Book
      </Button>
    </form>
  );
}
