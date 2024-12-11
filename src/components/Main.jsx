import React, { useEffect, useState } from 'react';
import Card from './Card';
import CardInfo from './CardInfo';
import axios from "axios"; 

const Main = () => {

  const [pokemon, setPokemon] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/"); 
  const [nextUrl, setNextUrl] = useState(); 
  const [prevUrl, setPrevUrl] = useState(); 
  const [pokeDex, setPokeDex] = useState(); 

  const getPokemon = async () => {
    setLoading(true); 
    const res = await axios.get(url); 

    setNextUrl(res.data.next); 
    setPrevUrl(res.data.previous); 
    getNewPokemon(res.data.results); 
    setLoading(false); 
  }

  const getNewPokemon = async (res) => {
    res.map(async(item) => {
      const result = await axios.get(item.url); 
 
      setPokemon(state => {
        state = [...state, result.data]
        state.sort((a, b) => a.id > b.id ? 1 : -1); 
        return state;
      })
    })
  }

  useEffect(() => {
    getPokemon(); 
  }, [url])

  return (
    <>
    <div className="container">
        <div className="left-content">
            <Card pokemon={pokemon} loading={loading} infoPokemon={poke=> setPokeDex(poke)}/>
            
            <div className="btn-group">
                {  prevUrl && <button onClick={()=>{
                    setPokemon([])
                   setUrl(prevUrl) 
                }}>Previous</button>}

                { nextUrl && <button onClick={()=>{
                    setPokemon([])
                    setUrl(nextUrl)
                }}>Next</button>}

            </div>
        </div>

        <div className="right-content">
           <CardInfo data={pokeDex}/>
        </div>
    </div>
</>
  )
};

export default Main;
