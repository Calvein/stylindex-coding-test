import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from '@reach/router'
import styled from '@emotion/styled'

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

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Pokemon = styled(Link)`
  display: flex;
  align-items: center;
  &:nth-of-type(even) {
    background: #f5f5f5;
  }
`

const Img = styled.img`
  height: 32px;
  margin-right: 8px;
`

const PokemonList = ({ children }) => {
  const { data, loading, refetching, error } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
  })

  if (loading && !refetching) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <List>
      {children}
      {data.pokemons.map((pokemon) => (
        <Pokemon key={pokemon.id} to={pokemon.name}>
          <Img src={pokemon.image} />#{pokemon.number} {pokemon.name}
        </Pokemon>
      ))}
    </List>
  )
}

export default PokemonList
