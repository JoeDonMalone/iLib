import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Col, Row, Container, CenteredContainer } from "../components/Grid";
import { Input } from "../components/Form";
import CollectionItems from "../components/CollectionItems";
// import axios from "axios";

function Collections() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [searchFilter, setSearch] = useState("");

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => {
        setBooks(res.data);
      })

      .catch((err) => console.log(err));
  }

  function handlesearchFilter(books) {
    return books.filter(
      (book) =>
        book.title.toLowerCase().indexOf(searchFilter.toLowerCase()) >
          -1 ||
        book.author.toLowerCase().indexOf(searchFilter.toLowerCase()) >
          -1
    );
  }

  const HandleInput = (e) => {
    console.log(searchFilter)
    return setSearch(e.target.value);
  };


  return (
    <Container fluid>
      <CenteredContainer centered>
        <Row fluid>
          <Col size="md-12 centered">
            <h1> My Collections</h1>
            <h4> You can filter your books by search!</h4>
          </Col>
        </Row>
      </CenteredContainer>

      <Container fluid>
        <Row fluid>
          <Col size="md-12 book-search">
            <Row className={" book-search-title-row"}>
              <h5> Search by Title </h5>
            </Row>
            <form>
              <Input
                onChange={HandleInput}
                name="title"
                placeholder="Title (required)"
              />
            </form>
          </Col>
        </Row>
      </Container>
      <br></br>
      {books.length ? (
      <Container fluid>
        <Row className={"-fluid results-title-row"}>
          <Col size="md-12 search-results">
            <Row className={" results-title-row"}>
              <h2> Volumes </h2>
            </Row>
            <br></br>
            <CollectionItems props={handlesearchFilter(books)}></CollectionItems>
          </Col>
        </Row>
      </Container>) : (
     <h5>No Books Added!</h5>
   )}
    </Container>
  );
}

export default Collections;
