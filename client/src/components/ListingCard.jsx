import {Card, Button} from 'react-bootstrap';
import { colorpalette } from '../constants/color';

const ListingCard = (props) => {

    const maxDescriptionLength = 70;
    let shortDescription = props.listing.description.substring(0,maxDescriptionLength)
    let image;
    let backgroundColor; 
    switch (props.listing.businessType) {
        case "food":
            image = "../images/food.png"
            backgroundColor = colorpalette.CORAL
            break;
        case "services":
            image = "../images/services.png"
            backgroundColor = colorpalette.LIGHTGREEN
            break;
        case "craft":
            image = "../images/toolbox.png"
            backgroundColor = colorpalette.LIGHTSKYBLUE
            break;
        case "art":
            image = "../images/pallete.png"
            backgroundColor = "#D9E21D"
            break;
        default:
            image = "../images/other.png"
            backgroundColor = "#F4F4F5"
            break;
    }

    if(props.listing.description.length > maxDescriptionLength){
        shortDescription += "...";
    }

    return (  
        <div className="listingCard">
            <Card className="d-flex flex-row" style={{backgroundColor: backgroundColor, color:"#fff", border : "none"}}>
                <Card.Body>
                    <Card.Title style={{color:"#000000"}}> {props.listing.businessName} </Card.Title>
                    <Card.Subtitle  style={{color:"#000000"}}>{(props.listing.businessType).toUpperCase()}</Card.Subtitle><br/>
                    <Card.Text style={{color:"#000000", font: "arial"}}>
                        {shortDescription}
                    </Card.Text>
                    <Button variant="primary" onClick={props.populateModal}> View More </Button>
                </Card.Body>
                <div style={{margin: "auto"}} className="mr-2">
                    <img src={image} alt="icon of business type" className="w-25 h-25 float-right"></img>
                </div>
            </Card>
        </div>
    );
}
 
export default ListingCard 