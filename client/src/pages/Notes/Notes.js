import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea } from "../../components/Form";
import Button from "../../components/Button";
import {Nav , SideNav} from "../../components/Nav";
import { Modal } from 'react-bootstrap';

class Notes extends Component {
  state = {
    notes: [],
    title: "",
    synopsis: "",
    currentUser: "",
    showModal: false
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    API.getNotes()
      .then((res,req) => {
        if(res.data.statusCode === 401){
          this.props.history.push("/login");
        }
        else {
          console.log("user:", res.data.sess);
          //console.log(req.user.id);
          this.setState({
            currentUser: res.data.sess.passport.user, 
            notes: res.data.results, 
            title: "", synopsis: "" })
        }
      })
      .catch(err => console.log(err));
  };

  open = () => {
    this.setState({ showModal: true });
  }; 
  
  close = () => {
    this.setState({ showModal: false });
  };

  deleteNote = id => {
    API.deleteNote(id)
      .then(res => this.loadNotes())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  addNoteClick = (event) => {
    this.handleFormSubmit(event); 
    this.close();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveNote({
        title: this.state.title,
        synopsis: this.state.synopsis,
        
      }, this.state.currentUser)
        .then(res => this.loadNotes())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Nav userInfo={this.state.currentUser } />
        <Row>
              <Col size = "md-3">
                <SideNav></SideNav>
              </Col>
              <Button onClick={this.open}>
                  + Add Note
              </Button>
            <Row>
            <Col size="md-6">
              {this.state.notes.length ? (
                <List>
                  {this.state.notes.map(note => (
                    <ListItem key={note._id}>
                      <DeleteBtn onClick={() => this.deleteNote(note._id)} />
                      <Link to={"/notes/"}>
                        <strong>
                          {note.title}
                          </strong>
                        <p>
                          {note.synopsis}
                        </p>  
                        </Link>
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </Col>
          </Row>
        </Row>      
        <Container>
          
          <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>New Note</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Discription (Optional)"
              />
                </form>
              </Modal.Body>
              <Modal.Footer>
                  <Button
                    disabled={!(this.state.title)}
                    onClick={this.addNoteClick}
                  >
                    Submit Note
                  </Button>
                  <Button onClick= {this.close}>Cancel</Button>
              </Modal.Footer>
              </Modal>
        </Container>
      </div>
    );
  }
}

export default Notes;
