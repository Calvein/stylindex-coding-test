import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import styled from '@emotion/styled'

import Loader from '../Loader'
import Pokemon from '../Pokemon'

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

const Item = styled(Link)`
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

const PokemonList = ({ match }) => {
  const { data, loading, refetching } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
  })

  if (loading && !refetching) return <Loader />

  const pokemonNames = data.pokemons.map(({ name }) => name)
  return (
    <List>
      <Route
        path="/:name"
        render={(routeProps) => (
          <Pokemon {...routeProps} pokemonNames={pokemonNames} />
        )}
      />
      {data.pokemons.map((pokemon) => (
        <Item key={pokemon.id} to={pokemon.name}>
          <Img src={pokemon.image} />#{pokemon.number} {pokemon.name}
        </Item>
      ))}
    </List>
  )
}

PokemonList.propTypes = {
  match: PropTypes.object,
}
export default PokemonList
