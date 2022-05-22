import styles from './CustomInputNumber.module.css'
import { useEffect, useReducer, useRef, useMemo } from 'react'
import { createSlice, current } from '@reduxjs/toolkit'

const customInputNumberSlice = createSlice({
  name: 'custom-input-number',
  initialState: {
    value: ''
  },
  reducers: {
    increase (state, action) {
      const { min, max, step = 1 } = action.payload
      if (current(state).value === '') {
        state.value = min ?? 0
        return
      }
      const currentValue = current(state).value
      if (max !== undefined && currentValue + step > max) {
        return
      }
      state.value = currentValue + step
    },
    decrease (state, action) {
      const { min, step = 1 } = action.payload
      if (current(state).value === '') {
        state.value = min ?? 0
        return
      }
      const currentValue = current(state).value
      if (min !== undefined && currentValue - step < min) {
        return
      }
      state.value = currentValue - step
    },
    assignValue (state, action) {
      const { min, max, rawValue } = action.payload
      const value = Number.parseInt(rawValue)

      if (Number.isNaN(value) || !Number.isInteger(value)) {
        if (min) {
          state.value = min
        } else {
          state.value = ''
        }
        return
      }

      if (min && value < min) {
        state.value = min
        return
      }
      if (max && value > max) {
        state.value = max
        return
      }
      state.value = value
    }
  }
})

const { increase, decrease } = customInputNumberSlice.actions

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  onChange,
  onBlur,
  disabled
}) => {
  const textInput = useRef(null)

  const dispatchInputValue = useMemo(
    () => (customValue) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set
      nativeInputValueSetter.call(textInput.current, customValue)
      textInput.current.dispatchEvent(new Event('input', { bubbles: true }))
    },
    [textInput.current]
  )

  const [state, dispatch] = useReducer(
    customInputNumberSlice.reducer,
    Object.assign({}, customInputNumberSlice.getInitialState(), {
      value: ''
    })
  )

  const onClickAdd = (e) => {
    e.preventDefault()
    dispatch(
      increase({
        min,
        max,
        step
      })
    )
  }

  const onClickMinus = (e) => {
    e.preventDefault()
    dispatch(
      decrease({
        min,
        max,
        step
      })
    )
  }

  useEffect(() => {
    dispatchInputValue(state.value)
  }, [state.value])

  return (
    <div className={styles.custom__number__input}>
      <button
        className={styles.minus__button}
        disabled={disabled}
        onClick={onClickMinus}
      >
        -
      </button>
      <input
        ref={textInput}
        inputMode="numeric"
        type="text"
        name={name}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={styles.text__input}
      />
      <button
        className={styles.add__button}
        disabled={disabled}
        onClick={onClickAdd}
      >
        +
      </button>
    </div>
  )
}

export default CustomInputNumber
