import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import  { Nav }   from "../../components/Nav";

class Home extends Component {

  render() {
    return (
      <div>
        <Nav/>
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Look Organize</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>

      </div>
    );
    
  }
  
}

export default Home;
