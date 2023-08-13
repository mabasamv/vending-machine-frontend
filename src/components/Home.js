import Card from "./Card";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Row} from "react-bootstrap";

const Home = () => {

    const [items, setItems] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/vending-machine/inventory/get-all-items')
            .then(value => {
                let data = value.data;
                // console.log(data)
                setItems(data)
                console.log(items)
                setLoaded(true)
            })
    }, [loaded]);

    if (loaded) {
        console.log(items.length)
        return (
            // <div className={"row"}>
            //     <div className={"col col-lg-3"}>
            //         {items.map(item => <Card key={item.item} item={item}/>)}
            //     </div>
            // </div>

            <Row lg={3}>
                {items && items.map((item, id) => {
                    <Col className="d-flex">
                        <Card className="flex-fill" key={id}>
                            <Card.Img variant="top" src={"#"} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                {/*<Card.Text>{description}</Card.Text>*/}
                                {/*<Card.Text>{category}</Card.Text>*/}
                                {/*<Card.Text>{price}</Card.Text>*/}
                                <Button variant="primary">Add to cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                })}
            </Row>

        );
    } else {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }


}

export default Home;

// https://stackoverflow.com/questions/71169840/how-to-display-react-bootstrap-card-component-side-by-side-horizontally/71178830#71178830