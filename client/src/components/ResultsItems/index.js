import React, { useState, setState, useEffect } from "react";
import { Container, Row, Col } from "../Grid";
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import "./style.css";

// title: { type: String, required: true },
// authors: { type: String, required: true },
// image: { type: String, required: true },
// link: { type: String, required: false },
// description: String,

function ResultsItems({ props }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    updateBooks(props);
  }, [props]);

  const updateBooks = async (props) => {
    let collection = [];

    await props.map((item, index) => {
      const id = index;
      const title = item.volumeInfo.title;
      const author = item.volumeInfo.authors.join(", ");
      const description = item.volumeInfo.description;
      const image = item.volumeInfo.imageLinks.thumbnail;
      const link = item.selfLink;
      return collection.push({ id, title, author, description, image, link });
    });

    setBooks(collection);
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  async function handleSave(event, index) {
    event.preventDefault();
    let book = books[index];
    console.log(book.author);
    if (book.title) {
      API.saveBook({
        title: book.title,
        author: book.author,
        description: book.description,
        image: book.image,
        link: book.link,
      })
        .then(async (res) => console.log(res))//loadBooks())
        .catch((err) => console.log(err));
    }
  }

  async function handleView(event, index) {
    event.preventDefault();
    console.log(index);

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    // async function handleFormSubmit(event) {
    //   event.preventDefault();
    //   if (formObject.title) {
    //     API.saveBook({
    //       title: formObject.title,
    //       author: formObject.author,
    //       synopsis: formObject.synopsis,
    //     })
    //       .then(async (res) => loadBooks())
    //       .catch((err) => console.log(err));
    //   }
    // }
  }

  //   <Link to={"/books/" + book._id}>
  //   <strong>
  //     {book.title} by {book.author}
  //   </strong>
  // </Link>
  // <DeleteBtn onClick={() => deleteBook(book._id)} />
  return books.map((book, index) => (
    <Container fluid key={`container-${index}`}>
      <Row className={" results-header-row"} key={`row-${index}`}>
        <Col size="md-10" key={`col-${index}`}>
          <Row fluid>{book.title}</Row>
          <Row fluid>Description </Row>
          <Row fluid>{book.author}</Row>
        </Col>
        <Col size="md-2 results-buttons">
          <form className={"results-form"}>
            <FormBtn
              onClick={(e) => {
                handleSave(e, index);
              }}
            >
              Save
            </FormBtn>
            <FormBtn
              onClick={(e) => {
                handleView(e, index);
              }}
            >
              View
            </FormBtn>
          </form>
        </Col>
      </Row>
      <br />

      <Row className={" results-details"}>
        <Col size="md-2">
          <Row className={" results-details-img"}>
            <img
              // src= {"https://via.placeholder.com/150.png"} //{book.imageSRC}
              src={
                !book.image ? "https://via.placeholder.com/150.png" : book.image
              }
              alt="placeholder"
            ></img>
          </Row>
        </Col>
        <Col size="md-10 results-text">
          <p>{book.description}</p>
        </Col>
      </Row>
      <br />
    </Container>
  ));
}

export default ResultsItems;
