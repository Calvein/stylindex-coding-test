import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

export const TYPES = {
  Normal: {
    light: 'rgb(168, 168, 120)',
    dark: 'rgb(109, 109, 78)',
  },
  Fire: {
    light: 'rgb(240, 128, 48)',
    dark: 'rgb(156, 83, 31)',
  },
  Fighting: {
    light: 'rgb(192, 48, 40)',
    dark: 'rgb(125, 31, 26)',
  },
  Water: {
    light: 'rgb(104, 144, 240)',
    dark: 'rgb(68, 94, 156)',
  },
  Flying: {
    light: 'rgb(168, 144, 240)',
    dark: 'rgb(109, 94, 156)',
  },
  Grass: {
    light: 'rgb(120, 200, 80)',
    dark: 'rgb(78, 130, 52)',
  },
  Poison: {
    light: 'rgb(160, 64, 160)',
    dark: 'rgb(104, 42, 104)',
  },
  Electric: {
    light: 'rgb(248, 208, 48)',
    dark: 'rgb(161, 135, 31)',
  },
  Ground: {
    light: 'rgb(224, 192, 104)',
    dark: 'rgb(146, 125, 68)',
  },
  Psychic: {
    light: 'rgb(248, 88, 136)',
    dark: 'rgb(161, 57, 89)',
  },
  Rock: {
    light: 'rgb(184, 160, 56)',
    dark: 'rgb(120, 104, 36)',
  },
  Ice: {
    light: 'rgb(152, 216, 216)',
    dark: 'rgb(99, 141, 141)',
  },
  Bug: {
    light: 'rgb(168, 184, 32)',
    dark: 'rgb(109, 120, 21)',
  },
  Dragon: {
    light: 'rgb(112, 56, 248)',
    dark: 'rgb(73, 36, 161)',
  },
  Ghost: {
    light: 'rgb(112, 88, 152)',
    dark: 'rgb(73, 57, 99)',
  },
  Dark: {
    light: 'rgb(112, 88, 72)',
    dark: 'rgb(73, 57, 47)',
  },
  Steel: {
    light: 'rgb(184, 184, 208)',
    dark: 'rgb(120, 120, 135)',
  },
  Fairy: {
    light: 'rgb(238, 153, 172)',
    dark: 'rgb(155, 100, 112)',
  },
}

const Wrapper = styled.span`
  padding: 2px 6px;
  border: 1px solid ${({ dark }) => dark};
  border-radius: 3px;
  background: ${({ light }) => light};
  font-size: 12px;
  font-weight: bold;
  color: #fff;
`

const Type = ({ className, of, as }) => (
  <Wrapper {...TYPES[of]} className={className} as={as}>
    {of}
  </Wrapper>
)

Type.propTypes = {
  className: PropTypes.string,
  of: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
  as: PropTypes.node,
}
export default Type
