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
    title:"",
    startDate:"",
    endDate:"",
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
            title: "",
            startDate: "",
            endDate:"",
          })
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
    if (this.state.title || this.state.startDate || this.state.endDate) {
      API.saveEvent({
        title: this.state.title,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      })
        .then(res => this.loadEvents())
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
              <MyCalendar slotSelected = {this.slotSelected} events={this.state.events}></MyCalendar>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>New Event</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Event"
                  />
                  
                  <p>Start:</p>
                  <Input
                    value={this.state.startDate}
                    onChange={this.handleInputChange}
                    type="date"
                    name="startDate"
                  />
                  <p>End:</p>
                  <Input
                    value={this.state.endDate}
                    onChange={this.handleInputChange}
                    type="date"
                    name="endDate"
                  />
                </form>
              </Modal.Body>
              <Modal.Footer>
                  <Button
                    disabled={!(this.state.startDate && this.state.endDate)}
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