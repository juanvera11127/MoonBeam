import { Form, Col, Button} from 'react-bootstrap'
import React from 'react'
import {Redirect,withRouter} from 'react-router-dom';

import '../css/style.css';



//class for grabbing information
class ListingForm extends React.Component {

    states = ['Select','Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

    validate = (event) => {
		event.preventDefault();
		let fields = this.state;
		let errors = {};
		let isValid = true;
		let nonEmptyFields = ["businessName","businessType","city","state","zipcode","description"];

		if(fields["businessName"] && !fields["businessName"].match(/^[a-zA-Z\s\']+$/)) {
			isValid = false;
			errors["businessName"] = "Invalid format (Letters, apostrophes, and spaces only)";
			}
		if(fields["address"] && !fields["address"].match(/^[#.0-9a-zA-Z\s,-]+$/)) {
			isValid = false;
			errors["address"] = "Invalid format (Numbers, letters, dashes, spaces only)";
		}
		if(fields["address2"] && !fields["address2"].match(/^[0-9a-zA-Z\s,-]+$/)) {
			isValid = false;
			errors["address2"] = "Invalid format (Numbers, letters, dashes, spaces only)";
		}
		if(fields["phone"] && !fields["phone"].match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) {
			isValid = false;
			errors["phone"] = "Invalid format (Numbers, dashes, parentheses only)";
		}
		if(fields["email"] && !fields["email"].match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/)) {
			isValid = false;
			errors["email"] = "Invalid format (Numbers, letters, dashes, spaces only)";
		}				
		if(fields["city"] && !fields["city"].match(/^[a-zA-Z\s]+$/)) {
			isValid = false;
			errors["city"] = "Invalid format (Letters and spaces only)";
		}
		if(fields["zipcode"] && !fields["zipcode"].match(/^\d{5}$/)) {
			isValid = false;
			errors["zipcode"] = "Invalid format (10000-99999 only";
		}
		nonEmptyFields.forEach(field => {
			if(!fields[field]){
				isValid = false;
				errors[field] = "Cannot be empty";
			}
		});
		if(isValid) {
			this.submitForm(event);
		}
		else {
			let s = "Form is invalid\n\n";
			Object.keys(errors).forEach(key => {
				if(errors[key]) {
					s += key + ": " + errors[key]+"\n";
				}
			});
		 alert(s);
		}
	}
    
    submitForm = async (event) => {
        event.preventDefault();
        const url = "http://" + window.location.hostname + ":5000/api/listing"

        const postBody = this.state;
        delete postBody.redirect;

        fetch(url, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
          });
        
          this.setState({redirect : true});

    }

    nameChange = (event) => this.setState({businessName : event.currentTarget.value});
    addressChange = (event) => this.setState({address : event.currentTarget.value});
    address2Change = (event) => this.setState({address2 : event.currentTarget.value});
    cityChange = (event) => this.setState({city : event.currentTarget.value});
    zipChange = (event) => this.setState({zipcode : event.currentTarget.value});
    phoneChange = (event) => this.setState({phone : event.currentTarget.value});
    emailChange = (event) => this.setState({email : event.currentTarget.value});
    descriptionChange = (event) => this.setState({description : event.currentTarget.value});
    stateChange = (event) => {
        let select = event.currentTarget;
        let option = select.value;
        this.setState({state: option});

    }

    typeChange = (event) => {
        const button = event.currentTarget;
        
        if(button.id === 'food')
            this.setState({businessType: "food"});
        else if(button.id === "services")
            this.setState({businessType: "services"});
        else if(button.id === "craft")
            this.setState({businessType: "craft"});
        else if(button.id === "art")
            this.setState({businessType: "art"});
        else if(button.id === "other")
            this.setState({businessType: "other"});
    }


    constructor(props) {
        super(props)
        this.state = {
            businessName: null,
            businessType: null,
            address: null,
            address2: null,
            city: null,
            state: null,
            zipcode: null,
            email: null,
            phone: null,
            description: null,
            redirect: false,
        }
    }
    
    render() {

        if(this.state.redirect){
            return <Redirect to="/"/>;
        }

        return(
            <div className="d-flex justify-content-center">
                <Form onSubmit={this.validate} className="my-4 w-75">
                    <Form.Group>
                        <Form.Label>Business Name *</Form.Label>
                        <Form.Control onChange={this.nameChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Business Type *</Form.Label>
                        <Form.Check
                            onChange={this.typeChange}
                            type="radio"
                            label="Food"
                            name="businessType"
                            id="food" />
                        <Form.Check
                            onChange={this.typeChange}
                            type="radio"
                            label="Services"
                            name="businessType"
                            id="services" />
                        <Form.Check
                            onChange={this.typeChange}
                            type="radio"
                            label="Craft"
                            name="businessType"
                            id="craft" />
                        <Form.Check
                            onChange={this.typeChange}
                            type="radio"
                            label="Art"
                            name="businessType"
                            id="art" />
                        <Form.Check
                            onChange={this.typeChange}
                            type="radio"
                            label="Other"
                            name="businessType"
                            id="other" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={this.emailChange}
                            placeholder="JohnDoe@example.com" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone *</Form.Label>
                        <Form.Control
                            onChange={this.phoneChange}
                            placeholder="123-456-7890" />
                    </Form.Group>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            onChange={this.addressChange}
                            placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                            onChange={this.address2Change}
                            placeholder="Apartment, studio, or floor"/>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City *</Form.Label>
                            <Form.Control onChange={this.cityChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State *</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." onChange={this.stateChange}>
                                {this.states.map((state) => <option>{state}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip *</Form.Label>
                            <Form.Control onChange={this.zipChange}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Description *</Form.Label>
                        <Form.Control
                            onChange={this.descriptionChange}
                            placeholder="Tell us about yourself!"
                            as="textarea"
                            rows={3} />
                    </Form.Group>
                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
            </div>
        )
    }
}
export default withRouter(ListingForm)