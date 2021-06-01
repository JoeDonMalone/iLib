import React, {useState, setState, useEffect} from "react";
import { Container, Row, Col } from "../Grid";
import { Input, TextArea, FormBtn } from "../Form";
import './style.css'

function ResultsItems(props) {
  // const [books, setBooks] = useState([])

  const books = [
    {
      title: "The Dead Zone",
      author: "Stephen King",
      synopsis:
        'A number-one national best seller about a man who wakes up from a five-year coma able to see people\'s futures and the terrible fate awaiting mankind in The Dead Zone - a "compulsive page-turner" (The Atlanta Journal-Constitution). Johnny Smith awakens from a five-year coma after his car accident and discovers that he can see people\'s futures and pasts when he touches them. Many consider his talent a gift; Johnny feels cursed. His fiancée married another man during his coma, and people clamor for him to solve their problems. When Johnny has a disturbing vision after he shakes the hand of an ambitious and amoral politician, he must decide if he should take drastic action to change the future. The Dead Zone is a "faultlessly paced...continuously engrossing" (Los Angeles Times) novel of second sight.',
    },
    {
      title: "The Dead Zone",
      author: "Stephen King",
      synopsis:
        'A number-one national best seller about a man who wakes up from a five-year coma able to see people\'s futures and the terrible fate awaiting mankind in The Dead Zone - a "compulsive page-turner" (The Atlanta Journal-Constitution). Johnny Smith awakens from a five-year coma after his car accident and discovers that he can see people\'s futures and pasts when he touches them. Many consider his talent a gift; Johnny feels cursed. His fiancée married another man during his coma, and people clamor for him to solve their problems. When Johnny has a disturbing vision after he shakes the hand of an ambitious and amoral politician, he must decide if he should take drastic action to change the future. The Dead Zone is a "faultlessly paced...continuously engrossing" (Los Angeles Times) novel of second sight.',
    },
  ];

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(event);
    // if (formObject.title && formObject.author) {
    //   API.saveBook({
    //     title: formObject.title,
    //     author: formObject.author,
    //     synopsis: formObject.synopsis,
    //   })
    //     .then((res) => loadBooks())
    //     .catch((err) => console.log(err));
    // }
  }
  return books.map((book, index) => (
    <Container fluid>
      <Row className={" results-header-row"}>
        <Col size="md-10">
          <Row fluid>{book.title}</Row>
          <Row fluid>Book Description:</Row>
          <Row fluid>{book.author}</Row>
        </Col>
        <Col size="md-2 results-buttons">
          <form className = {'results-form'}>
            <FormBtn onClick={handleFormSubmit}>Save</FormBtn>
            <FormBtn onClick={handleFormSubmit}>View</FormBtn>
          </form>
        </Col>
      </Row>
      <br />

      <Row className={" results-details"}>
        <Col size="md-2">
          <Row className={" results-details-img"}>
            <img
              className="placeHolder"
              src="https://via.placeholder.com/150.png"
              alt="placeholder"
            ></img>
          </Row>
        </Col>
        <Col size="md-10 results-text">
          <p>{book.synopsis}</p>
        </Col>
      </Row>
      <br />
    </Container>
  ));
}

export default ResultsItems;
