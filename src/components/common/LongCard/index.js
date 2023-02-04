import styles from "./longCard.module.css";

export default function LongCard({
  imgSrc,
  imgAlt,
  mealName,
  partnerName,
  order,
  address = "",
  btnValue,
  btnFn = () => {},
  hideBtn = false,
  updateStatus,
}) {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.card}`}>
          <img src={imgSrc} alt={imgAlt} />
        </div>
        <div className={`${styles.cardcenter}`}>
          <div className={`${styles.center}`}>
            <h3>{mealName}</h3>
            <p>{partnerName}</p>
            <p>{address ? <>Address:{address}</> : <>{address}</>}</p>
            <p>{order}</p>
          </div>
        </div>
        <div className={`${styles.btnClass}`}>
          <div className={`${styles.btnMain}`}>
            {!hideBtn && (
              <button className={`${styles.btn}`} onClick={btnFn}>
                {btnValue}
              </button>
            )}
            <span>Order Status:</span>
            <p>{updateStatus}</p>
          </div>
        </div>
      </div>
    </>
  );
}
