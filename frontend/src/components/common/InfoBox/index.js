import styles from "./infoBox.module.css";

export default function InfoBox({
  titleName,
  totalPayment,
  updateStatus,
  paymentDetails,
}) {
  return (
    <>
      <div>
        <div className={`${styles.card}`} style={{ color: "#000" }}>
          <div className={`${styles.row}`}>
            <div>
              <h3>{titleName}</h3>
            </div>
            {/* <div className={`${styles.img}`}>
              <img src="/icons/arrows-rotate-solid.svg" alt="img" />
            </div> */}
          </div>
          <div className={`${styles.row}`}>
            <div>
              <strong>
                <i className="fa-solid fa-indian-rupee-sign" /> {totalPayment}
              </strong>
            </div>
            <div>{/* <p>{updateStatus}</p> */}</div>
          </div>
          <p>
            Next Month Estimation:{" "}
            {Math.ceil(
              parseFloat(totalPayment) + (parseFloat(totalPayment) * 30) / 100,
            ) || 0}
          </p>
        </div>
      </div>
    </>
  );
}
