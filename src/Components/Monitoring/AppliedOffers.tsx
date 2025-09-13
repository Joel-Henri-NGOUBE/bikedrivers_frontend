import type { IAppliedOffersProp } from "../../Interfaces/IOffer";

export default function AppliedOffers({appliedOffers}: IAppliedOffersProp){
    return <div className="appliedOffers">
        {appliedOffers?.map((ao) => <div className="appliedOffer">
            <span className="title">{ao.title}</span>
            <span className="brand-model">{`${ao.brand} ${ao.brand}`}</span>
            <span className="state">{ao.state}</span>
            <span className="date">{ao.application_date}</span></div>
            )}
    </div>
}