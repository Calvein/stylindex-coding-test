import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from '@reach/router'
import { useSpring, animated } from 'react-spring'
import styled from '@emotion/styled'

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

const Backdrop = styled(animated(Link))`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
`

const Content = styled(animated.div)`
  position: fixed;
  top: 15vh;
  right: 5vh;
  bottom: 0;
  left: 5vh;
  border-radius: 5px 5px 0 0;
  background: #fff;
`

const Pokemon = ({ name }) => {
  const backdropStyle = useSpring({ opacity: 1, from: { opacity: 0 } })
  const contentStyle = useSpring({
    to: { transform: 'translateY(0)' },
    from: { transform: 'translateY(100%)' },
  })

  const { data, loading, refetching, error } = useQuery(GET_POKEMON, {
    variables: { name },
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'auto')
  }, [])

  if (loading && !refetching) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <>
      <Backdrop to="/" style={backdropStyle} />
      <Content style={contentStyle}>
        <pre>{JSON.stringify(data.pokemon, null, 4)}</pre>
      </Content>
    </>
  )
}

export default Pokemon
