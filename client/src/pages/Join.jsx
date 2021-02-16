import { Container} from 'react-bootstrap'
import ListingForm from '../components/ListingForm';
import { colorpalette } from '../constants/color';

const Join  = () => {
    return (
        <Container style={{color: colorpalette.BLACK}}>
            <ListingForm/>
        </Container>
    );
}

export default Join;
