import styles from './CustomInputNumber.module.css'
import { useEffect, useReducer, useRef, useMemo, useState } from 'react'
import { createSlice, current } from '@reduxjs/toolkit'

const customInputNumberSlice = createSlice({
  name: 'custom-input-number',
  initialState: {
    value: ''
  },
  reducers: {
    increase (state, action) {
      const { min, max, value, step = 1 } = action.payload
      if (value !== undefined) {
        state.value = value
        return
      }
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
      const { min, value, step = 1 } = action.payload
      if (value !== undefined) {
        state.value = value
        return
      }
      if (current(state).value === '') {
        state.value = min ?? 0
        return
      }
      const currentValue = current(state).value
      if (min !== undefined && currentValue - step < min) {
        return
      }
      state.value = currentValue - step
    }
  }
})

const { increase, decrease } = customInputNumberSlice.actions

const LONG_PRESS_EVENT_INTERVAL = 100

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  onChange = () => {},
  onBlur,
  disabled
}) => {
  const textInput = useRef(null)
  const [timerId, setTimerId] = useState(null)

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

  const onClickAdd = () => {
    dispatch(
      increase({
        min,
        max,
        value,
        step
      })
    )
  }

  const onClickMinus = () => {
    dispatch(
      decrease({
        min,
        max,
        value,
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
        disabled={disabled ?? state.value === min}
        onClick={onClickMinus}
        onMouseDown={() => {
          const id = setInterval(() => {
            onClickMinus()
          }, LONG_PRESS_EVENT_INTERVAL)
          setTimerId(id)
        }}
        onMouseUp={() => {
          clearInterval(timerId)
        }}
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
        onChange={(e) => {
          if (e.target.value === '' || e.target.value === undefined) {
            return
          }
          onChange(e)
        }}
        value={value}
        className={styles.text__input}
      />
      <button
        className={styles.add__button}
        disabled={disabled ?? state.value === max}
        onClick={onClickAdd}
        onMouseDown={() => {
          const id = setInterval(() => {
            onClickAdd()
          }, LONG_PRESS_EVENT_INTERVAL)
          setTimerId(id)
        }}
        onMouseUp={() => {
          clearInterval(timerId)
        }}
      >
        +
      </button>
    </div>
  )
}

export default CustomInputNumber
