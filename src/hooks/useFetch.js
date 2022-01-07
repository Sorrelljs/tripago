import { useState, useEffect } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {

        const fetchData = async () => {
            try {
                setIsPending(true) // set is pending to true while we wait for request
                const response = await fetch(url) // make fetch request
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                const json = await response.json() // change data to json
                setIsPending(false) // set is pending to false as its been resolved
                setData(json) // set data to newly caught data
                setError(null)

            } catch (err) {
                setIsPending(false) // no need to try to load anymore
                setError("Could not fetch data") 
                console.log(err.message) // log out the error
            }

        }
        fetchData()
    }, [url])
    return { data, isPending, error }
}


export default useFetch