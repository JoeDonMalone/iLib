import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, CenteredContainer } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import ResultsItems from "../components/ResultsItems";
import axios from "axios";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [results, setResults] = useState([]);
  const [formObject, setFormObject] = useState([]);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    getBookResults();
  }, [results]);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  async function getBookResults() {
    console.log(results);
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the Google API Call to call book data from Google books
  // Then updates book results state

  async function handleBookSearch(event) {
    event.preventDefault();
    if (formObject.title) {
      await axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${formObject.title}&key=AIzaSyCWWqbANIMpiaBiaUArF3bSe2Dj8eBCufs`)
        .then(
          async (res) => setResults(res.data.items)
        )
        .catch((err) => console.log(err));
    }
  }


  
  return (
    <Container fluid>
      <CenteredContainer centered>
        <Row fluid>
          <Col size="md-12 centered">
            <h1> (React) Google Book Search</h1>
            <h4> Search for and Save Books of Interest</h4>
          </Col>
        </Row>
      </CenteredContainer>

      <Container fluid>
        <Row fluid>
          <Col size="md-12 book-search">
            <Row className={" book-search-title-row"}>
              <h5> Book Search </h5>
            </Row>
            <br></br>
            <h6> Book </h6>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                // disabled={!(formObject.author && formObject.title)}
                onClick={handleBookSearch}
              >
                Enter Search
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
      <br></br>
      {results.length ? (
      <Container fluid>
        <Row className={"-fluid results-title-row"}>
          <Col size="md-12 search-results">
            <Row className={" results-title-row"}>
              <h2> Results </h2>
            </Row>
            <br></br>
            {/* className={`container-${centered ? "centered" : ""}`} */}
            <ResultsItems props={results}></ResultsItems>
          </Col>
        </Row>
      </Container>): (
        <h5></h5>
      )}
    </Container>
  );
}

export default Books;

/* <Input
onChange={handleInputChange}
name="author"
placeholder="Author (required)"
/>
<TextArea
onChange={handleInputChange}
name="synopsis"
placeholder="Synopsis (Optional)"
/> */

/* <Col size="md-6 sm-12">
<Jumbotron>
  <h1>Books On My List</h1>
</Jumbotron>
{books.length ? (
  <List>
    {books.map(book => (
      <ListItem key={book._id}>
        <Link to={"/books/" + book._id}>
          <strong>
            {book.title} by {book.author}
          </strong>
        </Link>
        <DeleteBtn onClick={() => deleteBook(book._id)} />
      </ListItem>
    ))}
  </List>
) : (
  <h3>No Results to Display</h3>
)}
</Col> */
