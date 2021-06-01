import React, {useState, setState, useEffect} from "react";
import { Container, Row, Col } from "../Grid";
import { Input, TextArea, FormBtn } from "../Form";
import './style.css'

function ResultsItems({props}) {
  // const [books, setBooks] = useState(
  //   props.map((item, index) => {
  //       const title = item.volumeInfo.title
  //       const author = item.volumeInfo.authors
  //       const description = item.volumeInfo.description
  //       const image = item.volumeInfo.imageLinks.thumbnail
  //       const link = item.selfLink 
  //     }
  //   )
    
  //  useEffect(() => {
  //     setBooks(props);
  //   }, [props]);

  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log(props)
    props.map((item, index) => {
      const title = item.volumeInfo.title
      const author = item.volumeInfo.authors
      const description = item.volumeInfo.description
      const image = item.volumeInfo.imageLinks.thumbnail
      const link = item.selfLink 
      return console.log(title, author, image, link)
  })

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

  return props.map((book, index) => (
  <Container fluid key={`container-${index}`}>
    <Row className={" results-header-row"} key={`row-${index}`}>
      <Col size="md-10" key={`col-${index}`}>
        <Row fluid>{book.volumeInfo.title}</Row>
        <Row fluid>Description </Row>
        <Row fluid>{book.volumeInfo.authors}</Row>
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
            // src= {"https://via.placeholder.com/150.png"} //{book.imageSRC}
            src= {!book.volumeInfo.imageLinks.thumbnail ? "https://via.placeholder.com/150.png": book.volumeInfo.imageLinks.thumbnail}
            alt="placeholder"
          ></img>
        </Row>
      </Col>
      <Col size="md-10 results-text">
        <p>{book.volumeInfo.description}</p>
      </Col>
    </Row>
    <br />
  </Container>
));
}

export default ResultsItems;

    // <form >
    //   <button onClick = {handleFormSubmit}></button>
    // </form>