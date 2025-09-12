import { Link } from "react-router";
import type { IOffer } from "../../Interfaces/IOffer";

export default function OfferComponent({offers}: {offers: IOffer[]}){
    return <div className="offers">
        {offers.map(offer => <Link to={`/offers/${offer.id}`}><div className="offer" key={offer.id}>
            <span className="title">{offer.title}</span>
            <span className="date">{new Date(offer.createdAt).toString()}</span>
            <p className="description">{offer.description}</p>
            <span className="price">{offer.price} €</span>
            <span className="service">{offer.service}</span>
        </div></Link>)
        }
    </div>
}