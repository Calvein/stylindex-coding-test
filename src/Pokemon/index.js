import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import styled from '@emotion/styled'

import PokemonContent from './Content'

const GET_POKEMON = gql`
  query getPokemon($name: String) {
    pokemon(name: $name) {
      id
      number
      name
      classification
      image
      evolutions {
        id
        name
        image
      }
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      types
      resistant
      weaknesses
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
  top: 15%;
  bottom: 0;
  left: 50%;
  width: 800px;
`

const Pokemon = ({ pokemonNames, history, match }) => {
  const backdropStyle = useSpring({ opacity: 1, from: { opacity: 0 } })
  const contentStyle = useSpring({
    to: { transform: 'translate(-50%, 0)' },
    from: { transform: 'translate(-50%, 100%)' },
  })

  const { data, loading, refetching } = useQuery(GET_POKEMON, {
    variables: { name: match.params.name },
  })

  let prevPokemon = null
  let nextPokemon = null
  if (data.pokemon) {
    const pokemonIndex = parseInt(data.pokemon.number, 10) - 1
    prevPokemon = pokemonNames[pokemonIndex - 1]
    nextPokemon = pokemonNames[pokemonIndex + 1]
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const keydown = (e) => {
      if (e.keyCode === 27) history.push('/')
      if (e.keyCode === 37 && prevPokemon) history.push(`/${prevPokemon}`)
      if (e.keyCode === 39 && nextPokemon) history.push(`/${nextPokemon}`)
    }
    window.addEventListener('keydown', keydown)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', keydown)
    }
  }, [prevPokemon, nextPokemon, history])

  return (
    <>
      <Backdrop to="/" style={backdropStyle} />
      <Content style={contentStyle}>
        <PokemonContent
          isLoading={loading && !refetching}
          pokemon={data.pokemon}
          prevPokemon={prevPokemon}
          nextPokemon={nextPokemon}
        />
      </Content>
    </>
  )
}

Pokemon.propTypes = {
  pokemonNames: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}
export default withRouter(Pokemon)
