import { Nav, Navbar, Form} from 'react-bootstrap';
import {colorpalette} from '../constants/color';


const NavigationBar = () => {
    return (
        <div>
            <Navbar style={{backgroundColor: colorpalette.GREY}} variant="dark">
            <img alt="Pentalam Logo" style={{width:"50px", height:"50px"}} src="../images/pentalam2.png"/>
                <Navbar.Brand href="/">Homemade Goods</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link style={{color: colorpalette.WHITE}} href="/">Home</Nav.Link>
                    <Nav.Link style={{color: colorpalette.WHITE}} href="/about">About Us</Nav.Link>
                    <Nav.Link style={{color: colorpalette.WHITE}} href="/join">Join</Nav.Link>
                </Nav>
                <Form inline>
                </Form>
            </Navbar>
        </div>
    );
}

export default NavigationBar;
