import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from '@reach/router'

const GET_POKEMONS = gql`
  query getPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
    }
  }
`

const PokemonList = ({ children }) => {
  const { data, loading, refetching, error } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
  })

  if (loading && !refetching) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <div>
      {data.pokemons.map((pokemon) => (
        <Link key={pokemon.id} to={pokemon.name}>
          {pokemon.name}
        </Link>
      ))}
      {children}
    </div>
  )
}

export default PokemonList
