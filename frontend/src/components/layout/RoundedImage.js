import styles from './RoundedImage.module.scss';

function RoundedImage(props) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      className={`${styles.rounded_image} ${styles[props.width]}`}
    />
  )
}

export default RoundedImage;