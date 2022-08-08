import styles from './Input.module.scss';

export default function Input({
  type, text, name, value, placeholder, multiple, onChange
}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type} name={name} id={name}
        placeholder={placeholder}
        value={value} onChange={onChange}
        {...(multiple ? {multiple} : '')}
      />
    </div>
  )
}
