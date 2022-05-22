import { render, screen, fireEvent } from '@testing-library/react'
import CustomInputNumber from './CustomInputNumber'

describe('click add button', () => {
  test('click add button when value < max', () => {
    const changeHandler = jest.fn()
    render(<CustomInputNumber max={2} step={1} onChange={changeHandler} />)
    const addButton = screen.getByRole('button', {
      name: '+'
    })
    const inputElement = screen.getByDisplayValue('0')
    expect(inputElement.value).toBe('0')
    fireEvent.click(addButton)
    expect(changeHandler).toBeCalled()
    expect(inputElement.value).toBe('1')
  })

  test('click add button when value == max limit', () => {
    const changeHandler = (e) => {
      console.log(e.target.value)
    }
    render(<CustomInputNumber max={2} value={2} onChange={changeHandler} />)
    const addButton = screen.getByRole('button', {
      name: '+'
    })
    fireEvent.click(addButton)
    expect(changeHandler).not.toBeCalled()
  })
})
