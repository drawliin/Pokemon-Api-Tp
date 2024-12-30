import React, {useEffect, useState} from 'react'

function AllPokemons() {

    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20');
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
        .then(res => {
            if(!res.ok){
                throw new Error('Something wrong...')
            }
            return res.json()
        })
        .then(data => {
            setData(data);
            console.log(data)
        })
        .catch(error => console.error(error))
    }, [url])

    const handlePrev = () => {
        setUrl(data.previous)
    }
    const handleNext = () => {
        setUrl(data.next)
    }

    return (
        <div>
            <h1>Pokemon List</h1>
            {data ? data.results.map((e) => {
                return <h2 key={e.name}>{e.name}</h2>
            }): <p>Loading...</p>}

            {data && (
                <>
                    <button onClick = {() => handlePrev()}>Prev</button> 
                    <button onClick = {() => handleNext()}>Next</button>
                </>
            )}
        </div>
    )
}

export default AllPokemons