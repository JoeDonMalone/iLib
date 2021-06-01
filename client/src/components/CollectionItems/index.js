import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "../Grid";
import {FormBtn } from "../Form";
import API from "../../utils/API";
import "./style.css";

// title: { type: String, required: true },
// authors: { type: String, required: true },
// image: { type: String, required: true },
// link: { type: String, required: false },
// description: String,

function CollectionItems({ props }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    updateBooks(props);
  }, [props]);

  const updateBooks = (props) => {
    console.log(props);
    let collection = [];

    props.map((item, index) => {
      const _id = item._id;
      const title = item.title;
      const author = item.author;
      const snippet = item.snippet;
      const description = item.description;
      const image = item.image;
      const link = item.link;
      return collection.push({
        _id,
        title,
        author,
        snippet,
        description,
        image,
        link,
      });
    });

    setBooks(collection);
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => updateBooks())
      .catch((err) => console.log(err));
  }

  function viewBook(e, url) {
    e.preventDefault();
    console.log(url);
    window.open(`${url}&key=AIzaSyCWWqbANIMpiaBiaUArF3bSe2Dj8eBCufs`, "_blank");
  }

  return books.map((book, index) => (
    <Container fluid key={`container-${index}`}>
      <Row className={" results-header-row"} key={`row-${index}`}>
        <Col size="md-10" key={`col-${index}`}>
          <Row fluid>
            <b>{book.title}</b>
          </Row>
          <Row fluid>
            <b>{book.snippet}</b>{" "}
          </Row>
          <Row fluid>
            <b>{book.author}</b>
          </Row>
        </Col>
        <Col size="md-2 results-buttons">
          <form className={"results-form"}>
            <FormBtn
              stylename={"google-view"}
              onClick={(e) => viewBook(e, book.link)}
            >
              View
            </FormBtn>
            <FormBtn stylename={"danger"} onClick={() => deleteBook(book._id)}>
              Delete
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
          <p>{book.description}</p>
        </Col>
      </Row>
      <br />
    </Container>
  ));
}

export default CollectionItems;
