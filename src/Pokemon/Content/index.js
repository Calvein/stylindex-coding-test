import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import Loader from '../../Loader'
import Type, { TYPES } from '../../Type'

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  border: solid ${({ border }) => border || 'transparent'};
  border-width: 4px 4px 0 4px;
  border-radius: 5px 5px 0 0;
  background: #fff;
  height: 100%;
`

const Header = styled.header`
  position: relative;
  padding: 16px 0;
  border-bottom: 4px solid ${({ border }) => border};
  text-align: center;
`

const PrevNext = styled(Link)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`
const PrevPokemon = styled(PrevNext)`
  left: 16px;
`
const NextPokemon = styled(PrevNext)`
  right: 16px;
`

const Content = styled.div`
  padding: 16px;
  font-size: 14px;
  overflow: auto;
`

const Images = styled.div`
  display: flex;
  align-items: center;
`
const Image = styled.img`
  height: 250px;
`

const Evolution = styled.div`
  display: flex;
  align-items: center;
`
const EvolutionSeparator = styled.div`
  margin: 0 32px;
  font-size: 48px;
`
const EvolutionImage = styled.img`
  height: 125px;
`

const Xxxx = styled.div`
  display: flex;
  justify-content: space-between;
`

const Size = styled.div()

const Types = styled.div`
  margin: 16px 0;
  font-weight: bold;
`
const TypeList = styled.div`
  margin-top: 4px;
`

const Attacks = styled.table``
const AttacksTitle = styled.caption`
  font-size: 18px;
  text-align: left;
  font-weight: bold;
`
const Attack = styled.tr``
const AttackName = styled.td`
  padding-right: 32px;
`
const AttackDamage = styled.td`
  padding: 0 4px;
  font-weight: bold;
  text-align: right;
  color: ${({ color }) => color};
`
const AttackType = styled(Type)`
  text-align: center;
`

const formatSize = (size) => {
  return +((parseFloat(size.minimum, 10) + parseFloat(size.maximum, 10)) / 2)
    .toFixed(2)
    .toString()
}

const PokemonContent = ({ isLoading, pokemon, prevPokemon, nextPokemon }) => {
  if (isLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    )
  }

  const { light } = TYPES[pokemon.types[0]]

  return (
    <Wrapper border={light}>
      <Header border={light}>
        {prevPokemon ? (
          <PrevPokemon to={`/${prevPokemon}`}>{prevPokemon}</PrevPokemon>
        ) : (
          <span />
        )}
        <h1>{pokemon.name}</h1>
        <h4>{pokemon.classification}</h4>
        {nextPokemon ? (
          <NextPokemon to={`/${nextPokemon}`}>{nextPokemon}</NextPokemon>
        ) : (
          <span />
        )}
      </Header>
      <Content>
        <Images>
          <Image src={pokemon.image} alt={pokemon.name} />
          {pokemon.evolutions &&
            pokemon.evolutions.map((evolution) => (
              <Evolution key={evolution.name}>
                <EvolutionSeparator>></EvolutionSeparator>
                <Link to={`/${evolution.name}`}>
                  <EvolutionImage src={evolution.image} alt={evolution.name} />
                </Link>
              </Evolution>
            ))}
        </Images>

        <Size>
          <div>Weight: {formatSize(pokemon.weight)}kg</div>
          <div>Height: {formatSize(pokemon.height)}m</div>
        </Size>

        <Xxxx>
          <div>
            <Types>
              Types:
              <TypeList>
                {pokemon.types.map((type) => (
                  <Type key={type} of={type} />
                ))}
              </TypeList>
            </Types>

            <Types>
              Resistant:
              <TypeList>
                {pokemon.resistant.map((type) => (
                  <Type key={type} of={type} />
                ))}
              </TypeList>
            </Types>

            <Types>
              Weaknesses:
              <TypeList>
                {pokemon.weaknesses.map((type) => (
                  <Type key={type} of={type} />
                ))}
              </TypeList>
            </Types>
          </div>

          <Attacks>
            <AttacksTitle>Attacks</AttacksTitle>
            <tbody>
              {[...pokemon.attacks.fast, ...pokemon.attacks.special].map(
                (attack) => (
                  <Attack key={attack.name}>
                    <AttackName>{attack.name}</AttackName>
                    <AttackDamage color={TYPES[attack.type].dark}>
                      {attack.damage}
                    </AttackDamage>
                    <AttackType as="td" of={attack.type} />
                  </Attack>
                ),
              )}
            </tbody>
          </Attacks>
        </Xxxx>
      </Content>
    </Wrapper>
  )
}

PokemonContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pokemon: PropTypes.object,
  prevPokemon: PropTypes.string,
  nextPokemon: PropTypes.string,
}
export default PokemonContent
