import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {Nav} from "../../components/Nav";

//testing heroku
class Register extends Component {
  state = {
    username: "",
    email:"",
    password: "",
    currentUser: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.password && this.state.email) {
      API.register({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if(res.data.user){
            this.props.history.push('/events');
          }
          else {
            console.log("no user");
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
        <div>
          <Nav userInfo={this.state.currentUser}></Nav>
            <Container fluid>   
                <Row>
                <Col size="md-3">
                </Col>
                <Col size="md-5">
                    <h2>Create an Account</h2>
                    <p>Create an account and you are on your way to looking more organize.</p>
                    <form>
                        <Input
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            name="username"
                            placeholder="Name (required)"
                        />
                        <Input
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            name="email"
                            placeholder="Email (required)"
                        />
                        <Input
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type= "password"
                            name="password"
                            placeholder="Password (required)"
                        />
                        <Link to={"/register" }>
                        <FormBtn
                            disabled={!(this.state.email && this.state.password && this.state.username)}
                            onClick={this.handleFormSubmit}
                        >
                        <span className="glyphicon glyphicon-user"></span>  Lets Get Started
                        </FormBtn>  
                        </Link>
                    </form>
                </Col>
                </Row>
            </Container>

        </div>
    );
    
  }
  
}

export default Register;
