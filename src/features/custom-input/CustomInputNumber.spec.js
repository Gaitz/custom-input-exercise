import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import CustomInputNumber from './CustomInputNumber'

describe('click add button', () => {
  const getAddButton = () => screen.getByRole('button', {
    name: '+'
  })

  test('onChange handler get target.name and target.value', () => {
    const changeHandler = jest.fn()
    const TEST_NAME = 'test-custom-input'
    render(<CustomInputNumber name={TEST_NAME} onChange={changeHandler} />)
    const addButton = getAddButton()
    fireEvent.click(addButton)
    expect(screen.getByDisplayValue('0')).toBeInTheDocument()
    fireEvent.click(addButton)
    expect(changeHandler).toBeCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: '1',
        name: TEST_NAME
      })
    }))
  })

  test('click add button when value < max', () => {
    const changeHandler = jest.fn()
    render(<CustomInputNumber onChange={changeHandler} />)
    const addButton = getAddButton()
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    fireEvent.click(addButton)
    expect(changeHandler).toBeCalled()
    expect(screen.getByDisplayValue('0')).toBeInTheDocument()
  })

  test('click add button when value == max limit', () => {
    const changeHandler = jest.fn()
    render(<CustomInputNumber max={2} value={2} onChange={changeHandler} />)
    const addButton = getAddButton()
    fireEvent.click(addButton)
    expect(changeHandler).not.toBeCalled()
  })

  test('long press add button', async () => {
    const changeHandler = jest.fn()
    render(<CustomInputNumber max={5} onChange={changeHandler} />)
    const addButton = getAddButton()
    fireEvent.mouseDown(addButton)
    await waitFor(() => expect(changeHandler).toBeCalledTimes(6))
  })

  test('add button support step attribute', () => {
    const changeHandler = jest.fn()
    render(<CustomInputNumber step={3} min={2} onChange={changeHandler} />)
    const addButton = getAddButton()
    fireEvent.click(addButton)
    expect(screen.getByDisplayValue('2')).toBeInTheDocument()
    fireEvent.click(addButton)
    expect(screen.getByDisplayValue('5')).toBeInTheDocument()
  })
})
