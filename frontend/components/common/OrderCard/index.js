import styles from "./orderCard.module.scss";

export default function OrderCard({
  imgSrc,
  imgAlt,
  mealName,
  partnerName,
  orderDate,
  deliveryStatus,
  deliveryOrderDate,
  btnComp = null,
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
            <p>{new Date(orderDate).toLocaleString()}</p>
          </div>
        </div>
        <div className={`${styles.btnClass}`}>
          <div className={`${styles.btnMain}`}>
            <p className={`${styles.orderStatus}`}>Order Status:</p>
            <p>
              {deliveryStatus} {btnComp}
            </p>
            <p>{new Date(deliveryOrderDate).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
