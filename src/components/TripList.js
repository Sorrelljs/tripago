import { useState } from "react"
// exporting default value you will not use a object 
import useFetch from "../hooks/useFetch"

// Styles
import './TripList.css'

// Below we will use the useEffect hook as we need a way to tell react 
// to only change a certain part of the component otherwise it just keeps running 
// the whole component over and over 

export default function TripList() {
    const [url, setUrl] = useState('http://localhost:3000/tripsff')
    const { data, isPending, error } = useFetch(url)
    return (
        <div className="trip-list">
            <h2>Trip List</h2>
            {isPending && <div>Loading Trips...</div>}
            {error && <div>{error}</div>}
            <ul>
                {/* Below we map through trips once the useEffect hook has pulled in the data */}
        {data && data.map(trip => (
                <li key={trip.id}>
                    <h3>{trip.title}</h3>
                    <p>{trip.price}</p>
                </li>
        ))}
                </ul>
                <div className="filter">
                    {/* Below we use the setUrl state to change onClick using the query parameter */}
                    {/* loc=europe. Once the state has changed, our useEffect hook is then initiated */}
                    {/*  as it's dependency is the url state. This then makes a fetch request to */}
                    {/*  the new update URL which is the loc=europe query params */}
                    <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>
                        European Trips
                    </button>
                    <button onClick={() => setUrl('http://localhost:3000/trips')}>
                        All Trips
                    </button>
                </div>
       </div>
    )
}
