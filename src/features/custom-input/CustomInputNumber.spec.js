import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CustomInputNumber from './CustomInputNumber'

describe('click add button', () => {
  test('click add button when value < max', () => {
    const changeHandler = jest.fn()
    render(<CustomInputNumber onChange={changeHandler} />)
    const addButton = screen.getByRole('button', {
      name: '+'
    })
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    fireEvent.click(addButton)
    expect(changeHandler).toBeCalled()
    expect(screen.getByDisplayValue('0')).toBeInTheDocument()
  })

  test('click add button when value == max limit', () => {
    const changeHandler = jest.fn()
    render(<CustomInputNumber max={2} value={2} onChange={changeHandler} />)
    const addButton = screen.getByRole('button', {
      name: '+'
    })
    fireEvent.click(addButton)
    expect(changeHandler).not.toBeCalled()
  })

  test('long press add button', async () => {
    const changeHandler = jest.fn()
    render(<CustomInputNumber max={5} onChange={changeHandler} />)
    const addButton = screen.getByRole('button', {
      name: '+'
    })
    fireEvent.mouseDown(addButton)
    await waitFor(() => expect(changeHandler).toBeCalledTimes(6))
  })
})
