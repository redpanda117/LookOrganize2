import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Button from "../../components/Button";
import {Nav , SideNav} from "../../components/Nav";
import { Modal } from 'react-bootstrap';

class Finance extends Component {
  state = {
    finance: [],
    title: "",
    cost: "",
    currentUser: "",
    showModal: false
  };

  componentDidMount() {
    this.loadFinance();
  }

  loadFinance = () => {
    API.getFinances()
      .then(res => {
        if(res.data.statusCode === 401){
          this.props.history.push("/login");
        }
        else {
          console.log("user:", res.data.sess);
          this.setState({currentUser: res.data.sess.passport.user, finance: res.data.results, title: "", cost: "" })
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

  deleteFinance = id => {
    API.deleteFinance(id)
      .then(res => this.loadFinance())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  totalCost = (cost) =>{
   let addedCost = 0;
   for(let i = 0; i< cost.length; i++){
     addedCost += parseFloat(cost[i].cost,10);  
   }
   console.log(addedCost);
   return(addedCost);
}

  addFinanceClick = (event) => {
    this.handleFormSubmit(event); 
    this.close();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveFinance({
        title: this.state.title,
        cost: this.state.cost,
        
      }, this.state.currentUser)
        .then(res => this.loadFinance())
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
                  + Add Finance
              </Button>
            <Row>
            <Col size="md-6">
              {this.state.finance.length ? (
                <div>
                   <h3 
                   onChange ={this.totalCost(this.state.finance)}
                   id = "totalCost"
                   >Current overall total is: {this.totalCost(this.state.finance)} </h3>
                <List>
                  {this.state.finance.map(finance => (
                    <ListItem key={finance._id}>
                      <Link to={"/finance/" + finance._id}>
                        <strong>
                          {finance.title} {finance.cost}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteFinance(finance._id)} />
                    </ListItem>
                  ))}
                </List>
                </div>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </Col>
          </Row>
        </Row>      
        <Container>
          
          <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>New Finance</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.cost}
                onChange={this.handleInputChange}  
                name="cost"
                placeholder="Discription (Optional)"
              />
                </form>
              </Modal.Body>
              <Modal.Footer>
                  <FormBtn
                    disabled={!(this.state.title)}
                    onClick={this.addFinanceClick}
                  >
                    Submit Finance
                  </FormBtn>
                  <Button onClick= {this.close}>Cancel</Button>
              </Modal.Footer>
              </Modal>
        </Container>
      </div>
    );
  }
}

export default Finance;
