import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Global, css } from '@emotion/core'

import PokemonList from '../PokemonList'

const App = () => (
  <Router>
    <Global
      styles={css`
        html {
          box-sizing: border-box;
        }

        *,
        ::before,
        ::after {
          padding: 0;
          margin: 0;
          box-sizing: inherit;
        }

        html,
        body,
        #root {
          height: 100%;
        }

        body {
          font-family: sans-serif;
          color: #222;
        }
      `}
    />
    <Route path="/" component={PokemonList} />
  </Router>
)

export default App
