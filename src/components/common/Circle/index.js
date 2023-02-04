import styles from "./circle.module.css";

export default function Circle({ imgSrc, imgAlt, riderName }) {
  return (
    <>
      <div className={`${styles.card}`}>
        <img src={imgSrc} alt={imgAlt} />
        <h3>{riderName}</h3>
      </div>
    </>
  );
}
