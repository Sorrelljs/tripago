import { useState, useEffect, useRef } from "react"

const useFetch = (url, _options) => {
    // Data state is updated by the custom fetch request which talks to the database
    const [data, setData] = useState(null)
    // IsPending handles the loader 
    const [isPending, setIsPending] = useState(false)
    // error state handles any errors
    const [error, setError] = useState(false)

    // use useRef to wrap an object/array argument
    // which is a useEffect dependency 

    const options = useRef(_options).current


    useEffect(() => {
        // Creating a abort controller
        // which will help with any requests made then cancelled mid way. (No errors if using this)
        const controller = new AbortController()

        const fetchData = async () => {
            console.log(options)
            try {
                setIsPending(true) // set is pending to true while we wait for request
                const response = await fetch(url, { signal: controller.signal }) // make fetch request
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                const json = await response.json() // change data to json
                setIsPending(false) // set is pending to false as its been resolved
                setData(json) // set data to newly caught data
                setError(null)

            } catch (err) { 
                if(err.name === "AbortError"){
                    console.log("fetch was aborted")
            } else {
                setIsPending(false) // no need to try to load anymore
                setError("Could not fetch data") 
                }
            }

        }
        fetchData()

        return () => {
            controller.abort()
        }
    }, [url, options])
    return { data, isPending, error }
}


export default useFetch