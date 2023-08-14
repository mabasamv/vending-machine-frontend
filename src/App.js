import './App.css';
import {Alert, Button, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import NavBarEx from "./view/NavBar";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import NoAmountFound, {Successfull} from "./view/InSuffeciaentError";

function App() {
    const getImageName = (itemCode) => {
        let path = "images/";
        let imageMap = {
            1: path + "chips.png",
            2: path + "chocolates.png",
            3: path + "drinks-300ml.png",
            4: path + "drinks-440ml.png",
            5: path + "drinks-500ml.png",
            6: path + "peanuts.png",
            7: path + "water-330ml.png",
            8: path + "water-500ml.png",
        }
        return imageMap[itemCode]
    }

    const [items, setItems] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [purchaseSuccessful, setPurchaseSuccessful] = useState('');
    const [inSuffFundData, setInSuffFundData] = useState('');
    const [isFundInsuff, setIsFundInsuff] = useState(false);
    const denRef = useRef([]);
    useEffect(() => {
        axios.get('http://localhost:8080/vending-machine/inventory/get-all-items')
            .then(value => {
                let data = value.data;
                setItems(data)
                setLoaded(true)
            })
    }, [loaded]);

    const purchaseItem = (e, itemCode, denominations) => {
        let request = {
            "itemCode": itemCode,
            "denominations": denominations
        };

        let purchaseRequest = JSON.stringify(request);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/vending-machine/purchase',
            headers: {
                'Content-Type': 'application/json'
            },
            data: purchaseRequest
        };

        axios.request(config)
            .then(response => JSON.stringify(response.data))
            .then(value => {
                if (value.status === 200) {
                    let data = value.data;
                    console.log(data)
                    setPurchaseSuccessful(data)
                    setLoaded(true)
                    setIsFundInsuff(false)
                }
            }).catch(reason => {
            console.log("Something went wrong: " + reason)
            let data = reason.response.data;
            setInSuffFundData(data)
            setIsFundInsuff(true)
        });

        if (inSuffFundData) {
            return alert(inSuffFundData.message)
        }
        denRef.current = [];
        window.location.reload();
    };

    function getCard(id, imgUri, name, unitPrice, itemCode, denominations, purchaseItem) {
        if (purchaseSuccessful) {
            return <Successfull/>
        } else return <Card className="flex-fill m-2 shadow p-3 mb-5 bg-white rounded" key={id}>
            <Card.Img className={"h-75"} variant="top" src={imgUri}/>
            <Card.Body className={"text-center"}>
                <Card.Title>{name}</Card.Title>
                <Card.Text>R{unitPrice}</Card.Text>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-outline-primary rounded-circle m-1" onClick={add1Rand}>R1
                    </button>
                    <button type="button" className="btn btn-outline-primary rounded-circle m-1" onClick={add2Rand}>R2
                    </button>
                    <button type="button" className="btn btn-outline-primary rounded-circle m-1" onClick={add5Rand}>R5
                    </button>
                    <button type="button" className="btn btn-outline-primary rounded-circle m-1" onClick={add10Rand}>R10
                    </button>
                    <button type="button" className="btn btn-outline-primary rounded-circle m-1" onClick={add20Rand}>R20
                    </button>
                </div>
                <Button variant="primary" onClick={(e) => purchaseItem(e, itemCode, denominations)}>Purchase</Button>
            </Card.Body>
        </Card>;
    }

    if (loaded) {
        let denominations = denRef.current
        return (
            <Container>
                <NavBarEx/>
                <Row lg={3}>
                    {items &&
                        items.map((product, id) => {
                            const {itemCode, name, unitPrice,} = product;
                            let imgUri = getImageName(itemCode)

                            return (
                                <Col className="d-flex">
                                    {
                                        getCard(id, imgUri, name, unitPrice, itemCode, denominations, purchaseItem)
                                    }
                                </Col>
                            );
                        })}
                </Row>
            </Container>
        );
    } else {
        return (
            <Spinner>Loading</Spinner>
        )
    }

    function add1Rand() {
        denRef.current.push("R1")
    }

    function add2Rand() {
        denRef.current.push("R2")
    }

    function add5Rand() {
        denRef.current.push("R5")
    }

    function add10Rand() {
        denRef.current.push("R10")
    }

    function add20Rand() {
        denRef.current.push("R20")
    }
}

export default App;
