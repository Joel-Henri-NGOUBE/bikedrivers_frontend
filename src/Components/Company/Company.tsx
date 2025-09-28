import "./company.css"

export default function Company({svg, length}: {svg: string, length: string}){
    return <div className="company">
                <img src={svg} alt="BikeDrivers" width={length}/>
                <h1>BikeDrivers</h1>
            </div>
}