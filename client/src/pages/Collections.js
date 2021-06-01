import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Col, Row, Container, CenteredContainer } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import CollectionItems from "../components/CollectionItems";
// import axios from "axios";

function Collections() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState([]);

  // const [results, setResults] = useState([]);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err))
  }



  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

    // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

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
             onChange={handleInputChange}
             name="title"
             placeholder="Title (required)"
           />
         </form>
       </Col>
     </Row>
   </Container>
      <br></br>
      {/* {books.length ? ( */}
        <Container fluid>
          <Row className={"-fluid results-title-row"}>
            <Col size="md-12 search-results">
              <Row className={" results-title-row"}>
                <h2> Volumes </h2>
              </Row>
              <br></br>
              <CollectionItems props={books}></CollectionItems>
            </Col>
          </Row>
        </Container>
     </Container>
  );
}

export default Collections;

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
