import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_POKEMON = gql`
  fragment pokemon on Pokemon {
    id
    number
    name
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    classification
    types
    resistant
    attacks {
      fast {
        name
        type
        damage
      }
      special {
        name
        type
        damage
      }
    }
    weaknesses
    fleeRate
    maxCP
    evolutionRequirements {
      amount
      name
    }
    maxHP
    image
  }

  query getPokemon($name: String) {
    pokemon(name: $name) {
      ...pokemon
      evolutions {
        ...pokemon
      }
    }
  }
`

const Pokemon = ({ name }) => {
  const { data, loading, refetching, error } = useQuery(GET_POKEMON, {
    variables: { name },
  })

  if (loading && !refetching) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>

  return <pre>{JSON.stringify(data.pokemon, null, 2)}</pre>
}

export default Pokemon
