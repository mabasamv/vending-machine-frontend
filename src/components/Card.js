import axios from "axios";
import {useState} from "react";


/*
I need to purchase items based on moneyy avaible on my account
 */
const Card = (props) => {
    const [itemList, setItemList] = useState('')

    const [loaded, setLoaded] = useState(false)
    const [isError, setIsError] = useState(false)
    const purchaseItem = (itemCode) => {
        const purchaseRequest = {itemCode: itemCode, denominations: ['R1', 'R5', 'R20']};
        axios.post('http://localhost:8080/vending-machine/purchase', purchaseRequest)
            .then(response => {
                console.log(response)
                setItemList(response.data)
                setLoaded(true)
            }).catch(reason => {
            console.log("Something went wrong: " + reason)
            setIsError(true)
        });
    };

    const getImageName = (itemCode) => {
        let path = "resource/images/";
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


    if (loaded) {
        return (
            <div>
                itemLoaded
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                <h2>Not more item left</h2>
            </div>
        )
    }

    return (
        <div className="card w-50 h-50">
            {/*<img src="resource/images/chips.png" className="card-img-top" alt="..."/>*/}
            <img src={getImageName(props.item.itemCode)} className="card-img-top" alt="..."/>
            <div className="card-body text-center">
                <h5 className="card-title">{props.item.name}</h5>
                <a href="#" className="btn btn-primary m-lg-2 rounded-5 text-center">R{props.item.unitPrice}</a>
                <a href="#" className="btn btn-primary m-lg-2" onClick={purchaseItem}>Purchase</a>
            </div>
        </div>
    )
}
export default Card