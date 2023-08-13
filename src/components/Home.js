import Card from "./Card";
import {useEffect, useState} from "react";
import axios from "axios";

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
            <div>
                {items.map(item => <Card key={item.item} item={item}/>)}
            </div>
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