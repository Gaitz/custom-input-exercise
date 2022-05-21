import styles from "./CustomInputNumber.module.css";

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  onChange,
  onBlur,
  disabled,
}) => {

  
  return (
    <div className={styles.custom__number__input}>
      <button className={styles.minus__button} disabled={disabled}>
        -
      </button>
      <input
        inputmode="numeric"
        type='number'
        value={value ?? 0}
        name={name}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        onBlur={onBlur}
        className={styles.text__input}
      />
      <button className={styles.add__button} disabled={disabled}>
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
