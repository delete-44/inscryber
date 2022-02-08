import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Name from "../components/name";

describe('Name', () => {
  it('renders a name label', () => {
    render(<Name setNameTF={() => {}}/>)

    const nameField = screen.getByRole('textbox', {
      name: /Name/,
    })

    expect(nameField).toBeInTheDocument();
  })
})
