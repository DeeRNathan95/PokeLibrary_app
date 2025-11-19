import { useEffect } from "react"

export function PokeCard (props) { //Once user selects a pokemon from the SideNav, this component will render out the details of the selected pokemon including stats, type, abilities, etc.
    const {selectedPokemon} = props
    const [data, setData] = useState(null) // State to hold the fetched Pokémon data
    const [loading, setLoading] = useState(false) // State to indicate loading status
   //const [error, setError] = useState(null) // State to hold any error that occurs during fetching

    useEffect(() => { 
        // Logic to fetch and display details of the selected Pokémon
        //If loading, exit loop
        if (loading || !localStorage) {return}

        //check if the selected pokemon information is available in the cache
        // 1. define the cache
        let cache = {} // defining in cache before the info we will get from the API is object - you can see on their website the data structure that is returned
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        // 2. Check if the selected prokong is in the cache, otherwise fetch from the API
        if(selectedPokemon in cache) {
            //READ FROM CACHE
            setData(cache[selectedPokemon])
            return
        } 

        //FETCH FROM API, passed all the cache stuff to no avail.

        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseIRL = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + selectedPokemon
                const finalURL = baseIRL + suffix
                const res = await fetch(finalURL)
                const pokemonData = await res.json()
                setData(pokemonData)

                cache[selectedPokemon] = pokemonData
                localStorage.setItem(JSON.stringify(cache))
            } catch (err) {
                //setError(err)
                console.log(err.message)
            } finally {
                setLoading(false)
            }
            }

            fetchPokemonData()

        // 3. If fetched from the API, store in the cache for future use

        // These steps are essential to prevent from getting banned from the API due to excessive requests
    }, [selectedPokemon])
    
    return (
        <div></div>
    )
}