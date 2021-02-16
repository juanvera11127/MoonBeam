import { Container, Col } from "react-bootstrap";
const About = () => {
    return (  
        <Container style={{height:"100vh"}}>
            <h1>What do we do?</h1>
            <Col md={6} className="m-auto">
                <img className="d-block mx-auto img-fluid w-50" src="../images/pentalam-black.png" alt="mysvg"
                ></img>
            </Col>
            <p style={{fontSize:"1.8rem"}}>Welcome to Homemade Goods! The idea of the local business space is dying, we believe that the people 
                should hold the power to distribute valuable goods via their local communities. We ask you as a 
                consumer to not shop for items from your local superstore, but from your more community of local 
                sellers. In this time of crisis we beleive that people are in dire need of business and what better than 
                a socety of a globalized world shopping from their local community.</p>    
        </Container>
        
    );
}
 
export default About;
