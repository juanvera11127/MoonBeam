import {Container, Jumbotron, Button, Form} from 'react-bootstrap';
import ListingCard from '../components/ListingCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { colorpalette } from '../constants/color';

const pStyle = {
    fontSize: '15px',
    textAlign: 'left',
  };
  
const containerStyle = {
	width: '400px',
	height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Home = () => {
	var coordList = {};
	var map;
    const [listings, setListings] = useState([]);
    
	function pog() {

       let url = "http://" + window.location.hostname + ":5000/api/listing";

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
               console.log(url);
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
                        <img style={{width:"250px", height:"250px"}} src="../images/pentalam2.png"/>
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
				
				<div className="d-flex justify-space-between">
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

				{listings.map((listing) => {
                return<ListingCard 
                        listing={listing}
                        ></ListingCard>
                })}
            </Container>
        </div>
    );
}
 
export default Home;