import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import styled from '@emotion/styled'

import Loader from '../Loader'
import Pokemon from '../Pokemon'
import Type, { TYPES } from '../Type'

const GET_POKEMONS = gql`
  query getPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      maxCP
      maxHP
      image
      types
    }
  }
`

const Wrapper = styled.div()

const Title = styled.h1`
  padding: 32px 0 48px;
  text-align: center;
`

const List = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border: 3px solid;
  border-color: ${({ color1, color2 }) =>
    `${color1} ${color2} ${color2} ${color1}`};
  border-radius: 3px;
  text-decoration: none;
`

const Id = styled.div`
  align-self: baseline;
  font-size: 10px;
`

const Image = styled.img`
  height: 72px;
  margin-right: 8px;
`

const Name = styled.div`
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
  color: ${({ color }) => color};
`

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 8px 0;
`

const Types = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  margin: 8px 0;
`

const MoreInfoLink = styled(Link)`
  align-self: flex-end;
  font-size: 14px;
  color: ${({ color1 }) => color1};
  transition: 200ms;
  &:hover,
  &:focus,
  &:active {
    color: ${({ color2 }) => color2};
  }
`

const PokemonList = ({ match }) => {
  const { data, loading, refetching } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
  })

  if (loading && !refetching) return <Loader />

  const pokemonNames = data.pokemons.map(({ name }) => name)
  return (
    <Wrapper>
      <Title>Pokemon List</Title>
      <List>
        {data.pokemons.map((pokemon) => {
          const type1 = TYPES[pokemon.types[0]]
          const type2 = TYPES[pokemon.types[1]]
            ? TYPES[pokemon.types[1]]
            : type1

          return (
            <Item key={pokemon.name} color1={type1.light} color2={type2.light}>
              <Id>{pokemon.id}</Id>
              <Image src={pokemon.image} />
              <Name color={type1.light}>
                #{pokemon.number} {pokemon.name}
              </Name>
              <Stats>
                <span>
                  Max CP: <strong>{pokemon.maxCP}</strong>
                </span>
                <span>
                  Max HP: <strong>{pokemon.maxHP}</strong>
                </span>
              </Stats>
              <Types>
                {pokemon.types.map((type) => (
                  <Type key={type} of={type} />
                ))}
              </Types>
              <MoreInfoLink
                to={pokemon.name}
                color1={type1.light}
                color2={type1.dark}
              >
                More information
              </MoreInfoLink>
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
