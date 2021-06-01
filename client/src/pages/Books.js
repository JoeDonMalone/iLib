import React, { useState} from "react";
import { Col, Row, Container, CenteredContainer } from "../components/Grid";
import ResultsItems from "../components/ResultsItems";
import { Input, FormBtn } from "../components/Form";
import axios from "axios";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState([]);

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
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${formObject.title}&key=AIzaSyCWWqbANIMpiaBiaUArF3bSe2Dj8eBCufs`
        )
        .then(async (res) => setBooks(res.data.items))
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
              <FormBtn stylename={"google-search"} onClick={handleBookSearch}>
                Enter Search
              </FormBtn>
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
                <h2> Results </h2>
              </Row>
              <br></br>
              <ResultsItems props={books}></ResultsItems>
            </Col>
          </Row>
        </Container>
      ) : (
        <h5>Enter a Search!</h5>
      )}
    </Container>
  );
}

export default Books;
