import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import sample from 'lodash/sample'

import { TYPES } from '../Type'

const loading = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(720deg);
  }
`

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  border: 8px solid;
  border-color: ${sample(TYPES).light} #ddd #ddd #ddd;
  border-radius: 50%;
  animation: ${loading} 2s infinite;
`

export default Loader
