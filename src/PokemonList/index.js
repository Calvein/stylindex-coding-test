import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import styled from '@emotion/styled'

import Loader from '../Loader'
import Pokemon from '../Pokemon'
import { TYPES } from '../Type'

const GET_POKEMONS = gql`
  query getPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      types
    }
  }
`

const Wrapper = styled.div()

const Title = styled.h1`
  padding: 16px;
  text-align: center;
`

const List = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
`

const Item = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border: 3px solid;
  border-color: ${({ type1, type2 }) =>
    `${type1.light} ${type2.light} ${type2.light} ${type1.light}`};
  border-radius: 3px;
  text-decoration: none;
  color: ${({ type1 }) => type1.light};
  transition: 200ms;
  &:hover,
  &:focus {
    background: ${({ type1, type2 }) =>
      `linear-gradient(to bottom right, ${type1.light}, ${type2.light} 300%)`};
    color: white;
  }
  &:active {
    border-color: ${({ type1, type2 }) =>
      `${type1.dark} ${type2.dark} ${type2.dark} ${type1.dark}`};
    background: ${({ type1, type2 }) =>
      `linear-gradient(to bottom right, ${type1.dark}, ${type2.dark} 300%)`};
    color: white;
  }
`

const Image = styled.img`
  height: 72px;
  margin-right: 8px;
`

const Name = styled.div`
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
`

const PokemonList = ({ match }) => {
  const { data, loading, refetching } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
  })

  if (loading && !refetching) return <Loader />

  const pokemonNames = data.pokemons.map(({ name }) => name)
  return (
    <Wrapper>
      <Title>Pokemons</Title>
      <List>
        {data.pokemons.map((pokemon) => {
          const type1 = TYPES[pokemon.types[0]]
          const type2 = TYPES[pokemon.types[1]]
            ? TYPES[pokemon.types[1]]
            : type1

          return (
            <Item
              key={pokemon.name}
              to={pokemon.name}
              type1={type1}
              type2={type2}
            >
              <Image src={pokemon.image} />
              <Name>
                #{pokemon.number} {pokemon.name}
              </Name>
            </Item>
          )
        })}
      </List>
      <Route
        path="/:name"
        render={(routeProps) => (
          <Pokemon {...routeProps} pokemonNames={pokemonNames} />
        )}
      />
    </Wrapper>
  )
}

PokemonList.propTypes = {
  match: PropTypes.object,
}
export default PokemonList
