import styles from './App.module.css'
import CustomInputNumber from '@features/custom-input/CustomInputNumber'

const App = () => {
  return (
    <div className={styles.container}>
      <CustomInputNumber />
    </div>
  )
}

export default App
