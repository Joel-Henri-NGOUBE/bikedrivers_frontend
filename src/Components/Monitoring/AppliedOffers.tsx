import type { IAppliedOffersProp } from "../../Interfaces/IOffer";

export default function AppliedOffers({appliedOffers}: IAppliedOffersProp){
    return <div className="appliedOffers">
        <h2>Applied Offers</h2>
        <div className="applied-wrapper">
            {appliedOffers?.map((ao, index) => <div className="appliedOffer" key={index}>
                <div className="top">
                    <span className="brand-model">{`${ao.brand} ${ao.model.toUpperCase()}`}</span>
                    <span className="date">{new Date(ao.application_date).toLocaleDateString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/").join("/")}</span>
                </div>
                <div className="bottom">
                    <span className="title">{ao.title}</span>
                    <span className="state" style={ao.state === "ACCEPTED" ? {color: 'var(--green-500)', borderColor: 'var(--green-500)'} : (ao.state === "REJECTED" ? {color: 'var(--red-400)', borderColor: 'var(--red-400)'} : {})}>{ao.state}</span>
                </div>
                </div>
                )}
        </div>
    </div>
}