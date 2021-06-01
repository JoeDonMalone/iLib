import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "../Grid";
import { FormBtn } from "../Form";
import API from "../../utils/API";
import "./style.css";

function ResultsItems({ props }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    updateBooks(props);
  }, [props]);

  const updateBooks = async (props) => {
    console.log(props);
    let collection = [];

    await props.map((item, index) => {
      const id = index;
      const title = item.volumeInfo.title;
      const author = item.volumeInfo.authors.join(", ");
      const snippet = item.searchInfo.textSnippet
      const description = item.volumeInfo.description;
      const image = item.volumeInfo.imageLinks.thumbnail;
      const link = item.volumeInfo.infoLink;
      return collection.push({ id,  title, author, snippet, description, image, link });
    });

    setBooks(collection);
  };

  function viewBook(e, url) {
    e.preventDefault();
    console.log(url);
    window.open(`${url}&key=AIzaSyCWWqbANIMpiaBiaUArF3bSe2Dj8eBCufs`, "_blank");
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  async function handleSave(event, index) {
    event.preventDefault();
    let book = books[index];
    if (book.title) {
      API.saveBook({
        title: book.title,
        author: book.author,
        snippet: book.snippet,
        description: book.description,
        image: book.image,
        link: book.link,
      })
        .then(async (res) => console.log(res)) //loadBooks())
        .catch((err) => console.log(err));
    }
  }

  return books.map((book, index) => (
    <Container fluid key={`container-${index}`}>
      <Row className={" results-header-row"} key={`row-${index}`}>
        <Col size="md-10" key={`col-${index}`}>
          <Row fluid><b>{book.title}</b></Row>
          <Row fluid><b>{book.snippet}</b> </Row>
          <Row fluid><b>{book.author}</b></Row>
        </Col>
        <Col size="md-2 results-buttons">
          <form className={"results-form"}>
            <FormBtn
              stylename={"google-save"}
              onClick={(e) => {
                handleSave(e, index);
              }}
            >
              Save
            </FormBtn>
            <FormBtn
              stylename={"google-view"}
              onClick={(e) => viewBook(e, book.link)}
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
              src={
                !book.image ? "https://via.placeholder.com/150.png" : book.image
              }
              alt="placeholder"
            ></img>
          </Row>
        </Col>
        <Col size="md-10 results-text">
          <p><b>{book.description}</b></p>
        </Col>
      </Row>
      <br />
    </Container>
  ));
}

export default ResultsItems;
