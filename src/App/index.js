import React from 'react'
import { Router } from '@reach/router'

import PokemonList from '../PokemonList'
import Pokemon from '../Pokemon'

const App = () => (
  <Router>
    <PokemonList path="/">
      <Pokemon path=":name" />
    </PokemonList>
  </Router>
)

export default App
