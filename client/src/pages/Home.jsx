import {Container, Jumbotron, Button, Modal, Form} from 'react-bootstrap';
import ListingCard from '../components/ListingCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { colorpalette } from '../constants/color';
import '../css/style.css'

const pStyle = {
    fontSize: '15px',
    textAlign: 'left',
  };
  
const containerStyle = {
	width: '400px',
	height: '400px',
	align: 'center'
};

const center = {
  lat: 34.0589,
  lng: -117.8194
};

const Home = () => {
	var coordList = {};
	var map;
    const [listings, setListings] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalListing, setModalListing] = useState({});
    const populateModal = (listing) => {
      setModalListing(listing);
      setModalShow(true);
    }
    
	function pog() {

       const url = "http://" + window.location.hostname + ":5000/api/listing";

       fetch(url,{
            method: 'GET',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
            'Content-Type': 'application/json'
            }
       })
         .then(res => res.json())
         .then(
           (result) => {
             setListings(result);
				 result.forEach(n => {
					 coordList[n.businessName] = n.zipcode;
				 });
				 		 setCoords();
           },
           (error) => {
               console.log("BROKE")
           }
         ) 

     }
	
	const onLoad = React.useCallback(function callback(rmap) {
		console.log(rmap);
		map = rmap;
		pog();
	}, [])

	const onUnmount = React.useCallback(function callback(map) {
	map = null;
	console.log('UNMOUNT');
	}, [])
	
	function setCoords() {	
		Object.keys(coordList).forEach(function(coord) {
			var coords;
			var zip = coordList[coord];
			var geo = new window.google.maps.Geocoder();
			var x;
			var y;
			geo.geocode({address: zip.toString()}, (results, status) => {
				if(!results[0]) {
					console.log(status);
				}
				else {	
					coords = results[0].geometry.location;
				}
				doNext();
			});
			function doNext() {
				var marker = new window.google.maps.Marker({
					position: coords,
					title: coord
				});
				console.log(marker);
				marker.setMap(map);
				map.setCenter(coords);						
			}

		});
	};
	
    return (  

        <div>

			<Container>
                <Jumbotron style={{backgroundColor: colorpalette.SUBBLACK, color:"#fff"}} className="d-flex justify-space-between">
                    <div>
                        <h1>HomeMade Goods</h1>
                        <hr className="my-2" />
                        <p style={pStyle}>
                            Check out local businesses that provide the stuff you need!
                        </p>
                        <p>
                        <Button size="lg" style={{backgroundColor: colorpalette.DARKPURPLE, color:"#fff", border:"none"}} href="/about">Learn more</Button>
                        </p>
                    </div>
                    <div style={{marginLeft:"30em"}}>
                        <img style={{width:"250px", height:"250px"}} alt="Pentalam-Logo" src="../images/pentalam2.png"/>
                    </div>
                </Jumbotron>

				<div>
					<Form>
						<Form.Group>
							<Form.Label>Enter <i><b>[City, State]</b></i> or <b><i>[Zip]</i></b> </Form.Label>
							<Form.Control/>
						</Form.Group>
						<Button type="submit" variant="primary">Submit</Button>
					</Form>
				</div>
				
				<div id="outer" className="d-flex justify-space-between mb-4">
					<div id="inner">
						<LoadScript googleMapsApiKey="AIzaSyDhIkEOGofsZP8xn6MYoxkwHkP7WBmieMs">
						  <GoogleMap
							mapContainerStyle={containerStyle}
							center={center}
							zoom={10}
							onLoad={onLoad}
							onUnmount={onUnmount}
						  >
							{ /* Child components, such as markers, info windows, etc. */ }
							<></>
						  </GoogleMap>
						</LoadScript>
					</div>
				</div>

				{listings.map((listing) => {
                return<ListingCard 
                        listing={listing}
                        populateModal={() => populateModal(listing)}
                        ></ListingCard>
                })}

                <DetailModal show={modalShow} onHide={() => setModalShow(false)} listing={modalListing}/>

            </Container>
        </div>
    );
}

const businessColor = (type) => {
  switch (type) {
    case "food":
        return colorpalette.CORAL
    case "services":
        return colorpalette.LIGHTGREEN
    case "craft":
        return colorpalette.LIGHTSKYBLUE
    case "art":
        return "#D9E21D"
    default:
        return "#F4F4F5"
  }
}

const DetailModal = (props) => {

    const modalColor = businessColor(props.listing.businessType);

    const listIfNonEmpty = (prefix, data) => (data === null || data === "") ? "" : <li>{prefix + data}</li> ;

    return (
        <Modal
          show={props.show}
          onHide={props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="my-modal"
        >
          <Modal.Header closeButton style={{backgroundColor: modalColor}}>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.listing.businessName}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ul>
              <li>Business type: {props.listing.businessType}</li>
              {listIfNonEmpty("Email: ", props.listing.email)}
              {listIfNonEmpty("Address: ", props.listing.address)}
              {listIfNonEmpty("Address2: ", props.listing.address2)}
              <li>City: {props.listing.city}</li>
              <li>State: {props.listing.state}</li>
              <li>Zip: {props.listing.zipcode}</li>
              <li>Phone: {props.listing.phone}</li>
            </ul>
            <p>{props.listing.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide} style={{margin: "auto"}}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}
 
export default Home;