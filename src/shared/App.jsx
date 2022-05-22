import styles from './App.module.css'
import CustomInputNumber from '@features/custom-input/CustomInputNumber'

const App = () => {
  return (
    <div className={styles.container}>
      <CustomInputNumber
        onChange={(e) => {
          console.log('outer onChange', e.target.value)
          console.log('outer onChange name', e.target.name)
        }}
        // min={1}
        max={5}
        // step={2}
        name='custom'
        onBlur={(e) => {
          console.log('outer onBlur', e.target.value)
        }}
      />
      <input
        type="number"
        onChange={(e) => {
          console.log('native onChange', e.target.value)
          console.log('native onChange name', e.target.name)
        }}
        min={1}
        max={5}
        step={2}
        name='native'
        onBlur={(e) => {
          console.log('native onBlur', e.target.value)
        }}
      />
    </div>
  )
}

export default App
