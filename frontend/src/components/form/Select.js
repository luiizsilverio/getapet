import styles from './Select.module.scss';

export default function Select(props) {
  const {text, name, options, value, onChange} = props;

  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        value={value || ''}
        onChange={onChange}
      >
        <option>Selecione uma opção</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  )
}
