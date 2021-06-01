import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, CenteredContainer } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import ResultsItems from "../components/ResultsItems";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
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

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log('here')
    if (formObject.title) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis,
      })
        .then((res) => loadBooks())
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
                onClick={handleFormSubmit}
              >
                Enter Search
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
      <br></br>

      <Container fluid>
        <Row className={"-fluid results-title-row"}>
          <Col size="md-12 search-results">
            <Row className={" results-title-row"}>
              <h5> Results </h5>
            </Row>
            <br></br>

            <ResultsItems
              props={{
                title: "The Dead Zone",
                author: "Stephen King",
                synopsis:
                  'A number-one national best seller about a man who wakes up from a five-year coma able to see people\'s futures and the terrible fate awaiting mankind in The Dead Zone - a "compulsive page-turner" (The Atlanta Journal-Constitution). Johnny Smith awakens from a five-year coma after his car accident and discovers that he can see people\'s futures and pasts when he touches them. Many consider his talent a gift; Johnny feels cursed. His fiancée married another man during his coma, and people clamor for him to solve their problems. When Johnny has a disturbing vision after he shakes the hand of an ambitious and amoral politician, he must decide if he should take drastic action to change the future. The Dead Zone is a "faultlessly paced...continuously engrossing" (Los Angeles Times) novel of second sight.',
                date: "2021-05-31T16:59:16.276Z",
                onClick: handleFormSubmit
              }}
            ></ResultsItems>
          </Col>
        </Row>
      </Container>
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