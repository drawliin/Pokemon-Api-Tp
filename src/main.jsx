import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Pokemon from './Pokemon'
import AllPokemons from './AllPokemons'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pokemon />

    <br/>
    <br/>
    <br/>
    <hr/>

    <AllPokemons/>
  </StrictMode>,
)
