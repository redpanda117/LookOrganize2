import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row} from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import {Nav , SideNav} from "../../components/Nav";

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
          this.setState({
            currentUser: res.data.sess.passport.user, 
            finance: res.data.results, 
            title: "", 
            cost: "" })
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
              <Col size="md-6">
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
                <FormBtn
                disabled={!(this.state.title)}
                onClick={this.addFinanceClick}
              >
                Submit Finance
              </FormBtn>
              </Col>
              </Row>
            <Row> 
              <Col size="md-3"></Col>
            <Col size="md-6">
              
                <div>
                   <h3 
                   value ={this.totalCost(this.state.finance)}
                   id = "totalCost"
                   >Current overall total is: ${this.totalCost(this.state.finance)} </h3>
                <table className="table table-bordered">
                  <thead>
                  <tr>
                    <th>Description</th>
                    <th>Cost</th>
                  </tr>
                  </thead>
                  {this.state.finance.map(finance => (
                    <tr key={finance._id}>
                        <td>
                        {finance.title}                         
                        </td>
                        <td>{finance.cost}</td>
                    </tr>
                  ))}
                </table>
                </div>
              
            </Col>
          </Row>
      </div>
    );
  }
}

export default Finance;
