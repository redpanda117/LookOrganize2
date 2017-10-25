import React, { Component } from "react";
import API from "../../utils/API";
import moment from 'moment';
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { Nav, SideNav}  from "../../components/Nav";
import MyCalendar from "../../components/MyCalendar";
import { Modal } from 'react-bootstrap';

class MySchedule extends Component {
  state = {
    events:[],
    body:"",
    start:"",
    end:"",
    date:"",
    currentUser:"",
    showModal: false
  };

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = () => {
    API.getEvents()
      .then(res => {
        if(res.data.statusCode === 401){
          this.props.history.push("/login");
        }
        else {
          console.log("user:", res.data.sess);
          this.setState({
            currentUser: res.data.sess.passport.user, 
            events: res.data.results,  
            body: "",
            start:"",
            end:"",
            date:""})
        }
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  open = () => {
    this.setState({ showModal: true });
  }; 
  
  close = () => {
    this.setState({ showModal: false });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.body || this.state.start || this.state.end) {
      API.saveEvent({
        body: this.state.body,
        date: this.state.date,
        start: this.state.start,
        end: this.state.end
      })
        .then(res => this.loadNote())
        .catch(err => console.log(err));
    }
  };
  addEventClick = (event) => {
    this.handleFormSubmit(event); 
    this.close();
  }
//checking if the date click on is the same
    slotSelected = (slotInfo) => {
      this.setState({ showModal: true });
      console.log(slotInfo)
    }
  
    
render(){
    return(
        <div>
        <Nav userInfo={this.state.currentUser}></Nav>
        <Row>
          <Col size = "md-2">
            <SideNav></SideNav>
          </Col>
          <Col size = "md-8">
              <MyCalendar slotSelected = {this.slotSelected}></MyCalendar>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>New Event</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <Input
                    value={this.state.body}
                    onChange={this.handleInputChange}
                    name="body"
                    placeholder="Event"
                  />
                  <p>Date:</p>
                  <Input
                  value={this.state.date}
                  onChange={this.handleInputChange}
                  type="date"
                  name="date"
                  />
                  <p>Start:</p>
                  <Input
                    value={this.state.start}
                    onChange={this.handleInputChange}
                    type="time"
                    name="start"
                  />
                  <p>End:</p>
                  <Input
                    value={this.state.end}
                    onChange={this.handleInputChange}
                    type="time"
                    name="end"
                  />
                </form>
              </Modal.Body>
              <Modal.Footer>
                  <Button
                    disabled={!(this.state.start && this.state.end)}
                    onClick={this.addEventClick}
                  >Add Event
                  </Button>
                  <Button onClick= {this.close}>Cancel</Button>
              </Modal.Footer>
            </Modal>
        </div>
)}




}





export default MySchedule;