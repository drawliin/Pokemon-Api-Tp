import React, {useEffect, useState, useRef} from 'react'



function Pokemon() {

    const [data, setData] = useState(null);
    const [pokemon, setPokemon] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const existedPokemon = useRef(new Map());


    useEffect(() => {

        if(pokemon){

            setLoading(true);
            setError(false);

            if(existedPokemon.current.has(pokemon)){
                setData(existedPokemon.current.get(pokemon))
                setLoading(false);
            }else{
                
                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then(res => {
                    if(!res.ok){
                        throw new Error('Invalid Name')
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data); 
                    existedPokemon.current.set(pokemon, data)
                    setLoading(false);

                })
                .catch(err => {setError(err.message); setLoading(false); setData(null)})  
            }
            
        }

    }, [pokemon]);


    return (
        <div>  
            <h1>Pokemon Search Api</h1>
            <input type='text' placeholder='Search...' onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={() => setPokemon(inputValue)} disabled={!inputValue.trim()}>Search</button>

            {loading && (<p>Loading...</p>)}
            {error && (<p>Error: {error}</p>)}
            
            
            {data && (
                <>
                    <h2>Name: {data.name}</h2>
                    <img src={data.sprites.front_default} />
                    <h2>Weight: {data.weight}</h2>
                </>
            )}

        </div>
    )
}

export default Pokemon