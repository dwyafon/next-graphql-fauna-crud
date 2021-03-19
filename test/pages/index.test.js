import React from 'react'

import { render, screen } from '../test.utils'
import Home from '../../pages/index'

describe('Home', () => {
  it('should render the home page h1', () => {
    render(<Home />)

    const h1 = screen.getByText(/Next Fauna GraphQL CRUD/i)

    expect(h1).toBeInTheDocument()
  })
})
